# The 10 Commandments of Speed Optimization

Core principles for building fast data-intensive applications, derived from Martin Kleppmann's *Designing Data-Intensive Applications*. These commandments are framework-agnostic and ordered by impact.

---

## 1. Measure Percentiles, Not Averages

**Averages lie about your users' experience.**

Track p50, p95, p99 latency — not arithmetic means. A system averaging 50ms but with a p99 of 3s has 1 in 100 requests that are 60x slower. The slowest requests often hit your most valuable users (those with the most data).

- Instrument every processing stage with wall-clock timings
- Track tail latency (p99, p99.9) — this is where real pain hides
- Measure throughput AND latency; optimizing one often degrades the other

**Anti-pattern**: "Average response time is 80ms, we're fine"
**Pattern**: "p99 spiked to 4s after the last deploy — investigate"

---

## 2. Choose the Right Storage Engine for Your Access Pattern

**Read-heavy and write-heavy workloads demand fundamentally different architectures.**

No single storage engine wins at everything. Understand your dominant access pattern:
- **B-Trees** (Postgres, MySQL): Balanced reads/writes, strong for point lookups
- **LSM-Trees** (ClickHouse, RocksDB, Cassandra): Sequential writes are fast, trades read latency for write throughput
- **Column-oriented** (ClickHouse, Parquet): Compresses well, scans only needed columns — ideal for analytical aggregations

**Key question**: Are you reading more than writing, or writing more than reading?

---

## 3. Design for Data Locality

**The fastest data is data stored close together.**

Disk seeks and network round-trips dominate latency. Keep related data co-located:
- Store documents that are loaded together as single units, not scattered across joins
- Align sort/partition keys with your most common query patterns
- Sequential access is orders of magnitude faster than random access — structure data to enable sequential scans
- Co-locate processing with data (move computation to the data, not data to computation)

**Metric**: Bytes read vs bytes actually needed per query

---

## 4. Partition to Eliminate Hotspots

**Spread load evenly; a system is only as fast as its slowest partition.**

Uneven data distribution creates bottlenecks where one node drowns while others idle:
- **Hash partitioning**: Distributes evenly but kills range queries
- **Range partitioning**: Enables efficient range scans but risks hotspots on popular keys
- Handle celebrity/skew keys explicitly — split or replicate hot partitions
- Rebalance partitions when load shifts; fixed partition counts with reassignment beat dynamic schemes

**Anti-pattern**: All queries for the busiest project hitting one partition
**Pattern**: Partition by project_id hash so load spreads across nodes

---

## 5. Precompute and Materialize Derived Data

**The fastest query is one where the answer is already computed.**

Don't recalculate what you can store:
- Use materialized views to pre-aggregate commonly queried results
- Build denormalized tables optimized for specific read patterns
- Use Change Data Capture (CDC) to keep derived data in sync with source data
- Trade storage (cheap) for compute (expensive at query time)

**Trade-off**: Write amplification and staleness vs query speed
**Rule**: If you run the same aggregation more than once, materialize it

---

## 6. Skip Data You Don't Need

**The fastest data to process is data you never read from disk.**

Minimize the volume of data scanned per query:
- Filter on partition keys first to skip entire data segments
- Use column-oriented storage so queries only read relevant columns
- Apply selective predicates as early as possible (push filters down)
- Use approximate algorithms (sampling, HyperLogLog) when exact answers aren't required

**Metric**: `rows_read / total_rows` — aim for this ratio to be as small as possible

---

## 7. Batch for Throughput, Stream for Latency

**Match your processing model to your latency requirements.**

Batch and stream processing solve different problems:
- **Batch**: Process bounded datasets in bulk. Optimize for throughput (records/sec). Tolerate minutes/hours of delay. Ideal for reprocessing, backfills, and full recomputation.
- **Stream**: Process unbounded events as they arrive. Optimize for low latency. Use windowing (tumbling, sliding, session) to bound computations.
- Combine both when you need accuracy (batch) with freshness (stream)

**Key question**: Does the user need this result in milliseconds, seconds, or can it wait?

---

## 8. Use Replication Strategically

**Replicas are a performance tool, not just a durability tool.**

Read replicas scale read throughput; geographic replicas reduce latency:
- Async replication gives speed but introduces stale reads — decide if your use case tolerates this
- Place replicas near consumers to minimize network latency
- Use leader-based replication for write ordering; leaderless for availability
- Size your connection pools and read routing to match your read/write ratio

**Trade-off**: Consistency vs speed — strong consistency requires coordination, which adds latency

---

## 9. Encode Data Compactly

**Smaller payloads mean less I/O, less network, less time.**

Data encoding directly impacts throughput at every layer:
- Binary formats (Protobuf, Avro, native column encoding) dramatically outperform JSON/XML for machine-to-machine communication
- Compression (LZ4 for speed, ZSTD for ratio) reduces disk I/O and network transfer
- Schema evolution support (Avro, Protobuf) avoids costly migrations while keeping payloads tight
- Fewer bytes read from disk = more effective use of disk bandwidth and buffer cache

**Rule**: Human-readable formats at the API boundary, compact binary formats internally

---

## 10. Correctness Is Non-Negotiable

**Speed without correctness is worse than slow.**

This is the SACRED RULE that cannot be violated:
- Same inputs must produce identical outputs before and after optimization
- Understand your consistency requirements — eventual consistency is fine when it is, catastrophic when it isn't
- Verify outputs with automated comparison between versions
- Reject any optimization that changes results outside of documented precision bounds

**Verification**: Diff outputs before and after every performance change. No exceptions.

---

## Application Order

When approaching an optimization task:

1. **Measure** — instrument and identify the actual bottleneck (Commandment 1)
2. **Evaluate storage** — is the engine matched to the access pattern? (Commandment 2)
3. **Check locality** — is related data co-located? (Commandment 3)
4. **Balance partitions** — is load distributed evenly? (Commandment 4)
5. **Precompute** — can we materialize the answer ahead of time? (Commandment 5)
6. **Minimize reads** — are we scanning more data than necessary? (Commandment 6)
7. **Match processing model** — batch vs stream for the use case (Commandment 7)
8. **Scale reads** — can replication offload query pressure? (Commandment 8)
9. **Compress** — are we moving the minimum bytes possible? (Commandment 9)
10. **Verify** — confirm correctness after every change (Commandment 10)

---

## Quick Reference

| Commandment | Key Question | Technique |
|-------------|--------------|-----------|
| 1. Measure Percentiles | Where is time actually spent? | p50/p95/p99 instrumentation |
| 2. Right Storage Engine | Read-heavy or write-heavy? | B-Trees vs LSM-Trees vs columnar |
| 3. Data Locality | Is related data co-located? | Sort keys, partition keys, denormalization |
| 4. Partition Evenly | Is one node doing all the work? | Hash/range partitioning, hotspot handling |
| 5. Precompute | Are we recalculating known answers? | Materialized views, CDC, denormalized tables |
| 6. Skip Data | How much data are we actually reading? | Column pruning, predicate pushdown, sampling |
| 7. Batch vs Stream | What latency does the user need? | Bulk processing vs event-driven pipelines |
| 8. Replicate Strategically | Can we scale reads with replicas? | Async replicas, geographic placement |
| 9. Encode Compactly | Are payloads as small as possible? | Binary formats, compression, schema evolution |
| 10. Correctness First | Is output identical after the change? | Automated output diff comparison |
