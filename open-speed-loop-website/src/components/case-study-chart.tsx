"use client";

import {
  BarChart,
  Bar,
  BarXAxis,
  BarYAxis,
  Grid,
  ChartTooltip,
} from "@/components/ui/charts";
import { PatternLines } from "@visx/pattern";
import { useChart } from "@/components/ui/charts/chart-context";
import type { CaseStudyMeta } from "@/lib/content";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

interface CaseStudyChartProps {
  data: CaseStudyMeta[];
}

// Component to render value labels on top of first and last bars (vertical only)
function BarValueLabels({
  chartData,
}: {
  chartData: Array<{
    loop: string;
    _ms: number;
    _title: string;
    _status: string;
    _improvement: string;
  }>;
}) {
  const { barScale, bandWidth, yScale, isLoaded, orientation } = useChart();

  if (!isLoaded || !barScale || !bandWidth || !yScale || orientation === "horizontal") {
    return null;
  }

  const labelsToShow = [0, chartData.length - 1];

  return (
    <g>
      {labelsToShow.map((idx) => {
        const point = chartData[idx];
        if (!point) return null;

        const categoryValue = point.loop;
        const value = point._ms;
        const barX = barScale(categoryValue) ?? 0;
        const barY = yScale(value) ?? 0;

        return (
          <text
            key={`label-${categoryValue}`}
            x={barX + bandWidth / 2}
            y={barY - 16}
            textAnchor="middle"
            className="font-pixel-square text-sm fill-foreground font-semibold tabular-nums"
          >
            {value.toLocaleString()}ms
          </text>
        );
      })}
    </g>
  );
}

BarValueLabels.displayName = "BarValueLabels";

function TooltipContent({ point }: { point: Record<string, unknown> }) {
  const status = String(point._status ?? "");
  const title = String(point._title ?? "");
  const ms = Number(point._ms ?? 0);
  const improvement = String(point._improvement ?? "");

  const statusStyles =
    status === "approved"
      ? "bg-primary/10 text-primary border-primary/20"
      : status === "rejected"
        ? "bg-muted text-muted-foreground/60 border-border"
        : status === "skipped"
          ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
          : "bg-primary/5 text-primary/60 border-primary/15";

  return (
    <div className="flex flex-col gap-2 p-3 min-w-[200px]">
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center px-1.5 py-0.5 text-[9px] font-medium border rounded ${statusStyles}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        <span className="text-muted-foreground text-[10px]">
          Loop {String(point.loop ?? "")}
        </span>
      </div>
      <div className="text-xs font-medium leading-tight">
        {title}
      </div>
      <div className="flex items-baseline gap-2 pt-1">
        <span className="text-sm font-medium tabular-nums">
          {ms.toLocaleString()}ms
        </span>
        {improvement && improvement !== "none" && improvement !== "—" && (
          <span className="text-primary/80 text-[10px] font-medium">
            {improvement}
          </span>
        )}
      </div>
    </div>
  );
}

export function CaseStudyChart({ data }: CaseStudyChartProps) {
  const isMobile = useIsMobile();
  const firstBaseline = data[0]?.baseline_ms ?? 0;

  // Build chart data: loop 00 = baseline, then each loop's result_ms
  const chartData = [
    {
      loop: "00",
      approved: firstBaseline,
      rejected: 0,
      skipped: 0,
      pending: 0,
      _title: "Baseline",
      _status: "baseline",
      _improvement: "—",
      _ms: firstBaseline,
    },
    ...data.map((d) => {
      const ms = d.result_ms ?? d.baseline_ms;
      return {
        loop: String(d.loop).padStart(2, "0"),
        approved: d.status === "approved" ? ms : 0,
        rejected: d.status === "rejected" ? ms : 0,
        skipped: d.status === "skipped" ? ms : 0,
        pending: d.status === "in-progress" ? ms : 0,
        _title: d.title,
        _status: d.status,
        _improvement: d.improvement,
        _ms: ms,
      };
    }),
  ];

  return (
    <section className="mb-16 sm:mb-32">
      <div className="flex items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-3 flex-1">
          <h2 className="font-pixel-square text-xl font-normal tracking-wide">
            CASE STUDY
          </h2>
          <div className="h-px bg-border flex-1" />
        </div>
        <Link
          href="/case-studies"
          className="text-muted-foreground text-xs hover:text-foreground transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="space-y-4">
        <p className="text-muted-foreground text-sm font-light max-w-2xl">
          {data.length} optimization loops on a user journey mapping algorithm. Baseline:{" "}
          {firstBaseline.toLocaleString()}ms.
        </p>

        {/* Legend with progress indicators */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-primary" />
              <span className="text-muted-foreground font-medium">Approved</span>
            </div>
            <span className="font-pixel-square text-primary/60 font-medium tabular-nums">
              {data.filter((d) => d.status === "approved").length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ background: "hsl(24 5.4% 30%)" }}
              />
              <span className="text-muted-foreground font-medium">Rejected</span>
            </div>
            <span className="font-pixel-square text-muted-foreground font-medium tabular-nums">
              {data.filter((d) => d.status === "rejected").length}
            </span>
          </div>

          {data.some((d) => d.status === "skipped") && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <svg width="12" height="12" className="rounded-sm overflow-hidden">
                  <defs>
                    <pattern id="skippedLegend" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <rect width="6" height="6" fill="hsl(24 5.4% 30%)" />
                      <line x1="0" y1="0" x2="0" y2="6" stroke="hsl(24 5.4% 45%)" strokeWidth="2" />
                    </pattern>
                  </defs>
                  <rect width="12" height="12" fill="url(#skippedLegend)" />
                </svg>
                <span className="text-muted-foreground font-medium">Skipped</span>
              </div>
              <span className="font-pixel-square text-muted-foreground font-medium tabular-nums">
                {data.filter((d) => d.status === "skipped").length}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="border border-border p-3 sm:p-5 lg:p-7 mt-6">
        <BarChart
          data={chartData}
          xDataKey="loop"
          barGap={isMobile ? 0.12 : 0.08}
          stacked
          orientation={isMobile ? "horizontal" : "vertical"}
          aspectRatio={isMobile ? "1 / 2" : "3 / 1"}
          margin={
            isMobile
              ? { top: 10, right: 20, bottom: 10, left: 30 }
              : { top: 20, right: 12, bottom: 40, left: 40 }
          }
        >
          <Grid
            horizontal={!isMobile}
            vertical={isMobile}
            numTicksRows={4}
            strokeDasharray="2,3"
            fadeHorizontal={!isMobile}
            fadeVertical={isMobile}
            strokeOpacity={0.4}
          />
          <Bar
            dataKey="approved"
            fill="var(--primary)"
            lineCap={3}
            fadedOpacity={0.15}
          />
          <Bar
            dataKey="rejected"
            fill="hsl(24 5.4% 30%)"
            lineCap={3}
            fadedOpacity={0.15}
          />
          <PatternLines
            id="skippedPattern"
            height={8}
            width={8}
            stroke="hsl(24 5.4% 45%)"
            strokeWidth={2}
            orientation={["diagonal"]}
            background="hsl(24 5.4% 30%)"
          />
          <Bar
            dataKey="skipped"
            fill="url(#skippedPattern)"
            lineCap={3}
            fadedOpacity={0.15}
          />
          {isMobile ? <BarYAxis showAllLabels /> : <BarXAxis maxLabels={10} />}
          <BarValueLabels chartData={chartData} />
          <ChartTooltip
            showCrosshair={false}
            showDots={false}
            content={({ point }) => <TooltipContent point={point} />}
          />
        </BarChart>
      </div>
    </section>
  );
}
