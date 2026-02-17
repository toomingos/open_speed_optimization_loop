"use client";

import { useEffect, useState } from "react";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  type Node,
  type Edge,
  BackgroundVariant,
  useReactFlow,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { FlowData } from "@/lib/content";

interface StepNodeData {
  label: string;
  duration?: string;
  highlight?: boolean;
  removed?: boolean;
  added?: boolean;
  error?: boolean;
}

function StepNode({ data }: { data: StepNodeData }) {
  const handleStyle = {
    opacity: 0,
    width: 4,
    height: 4,
    background: "transparent",
    border: "none",
  };

  let borderColor = "border-foreground/20";
  let bg = "bg-background";
  let textColor = "text-foreground";

  if (data.removed) {
    borderColor = "border-red-500/40";
    bg = "bg-red-950/20";
    textColor = "text-red-400 line-through";
  } else if (data.added) {
    borderColor = "border-emerald-500/40";
    bg = "bg-emerald-950/20";
    textColor = "text-emerald-400";
  } else if (data.highlight) {
    borderColor = "border-primary/40";
    bg = "bg-primary/5";
  } else if (data.error) {
    borderColor = "border-red-500/40";
    bg = "bg-red-950/20";
  }

  return (
    <>
      <Handle type="target" position={Position.Left} style={handleStyle} isConnectable={false} />
      <Handle type="source" position={Position.Right} style={handleStyle} isConnectable={false} />
      <Handle type="target" position={Position.Top} id="top" style={handleStyle} isConnectable={false} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={handleStyle} isConnectable={false} />
      <div
        className={`flex flex-col items-center justify-center px-4 py-2 rounded border transition-all ${borderColor} ${bg}`}
        style={{ minWidth: 120, whiteSpace: "nowrap" }}
      >
        <span className={`font-pixel-square text-xs font-medium ${textColor}`}>{data.label}</span>
        {data.duration && (
          <span className="font-pixel-square text-[10px] text-foreground/60">{data.duration}</span>
        )}
      </div>
    </>
  );
}

const nodeTypes = { step: StepNode };

function FlowPanel({ nodes: initialNodes, edges: initialEdges }: { nodes: Node[]; edges: Edge[] }) {
  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);
  const { fitView } = useReactFlow();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setTimeout(() => fitView({ padding: 0.05, duration: 200 }), 50);
    }
  }, [mounted, fitView]);

  if (!mounted) {
    return <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 text-xs">Loading...</div>;
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.05 }}
      panOnDrag={false}
      zoomOnScroll={false}
      zoomOnPinch={false}
      panOnScroll={false}
      selectionOnDrag={false}
      minZoom={0.2}
      maxZoom={1.5}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      proOptions={{ hideAttribution: true }}
    >
      <Background color="hsl(12 6.5% 15.1%)" gap={20} size={1} variant={BackgroundVariant.Dots} />
    </ReactFlow>
  );
}

function toHorizontalNodes(nodes: Node[]): Node[] {
  return nodes.map((n) => ({
    ...n,
    position: {
      x: (n.position.y / 80) * 180,
      y: n.position.x,
    },
  }));
}

function toHorizontalEdges(edges: Edge[]): Edge[] {
  return edges.map((e) => ({
    ...e,
    type: "smoothstep",
    style: { stroke: "hsl(24 5.4% 45%)", strokeWidth: 1.5 },
  }));
}

export function CaseStudyFlowChart({ flow, status }: { flow: FlowData; status?: string }) {
  const beforeLabelColor = status === "rejected"
    ? "text-muted-foreground"
    : "text-muted-foreground";
  const afterLabelColor = status === "approved"
    ? "text-primary"
    : status === "rejected"
      ? "text-red-400"
      : "text-muted-foreground";

  return (
    <div className="border border-border rounded divide-y divide-border">
      <div className="p-4">
        <p
          className={`font-pixel-square text-[10px] font-medium tracking-widest ${beforeLabelColor} mb-3`}
        >
          BEFORE
        </p>
        <div className="h-[240px]">
          <ReactFlowProvider>
            <FlowPanel
              nodes={toHorizontalNodes(flow.before.nodes as Node[])}
              edges={toHorizontalEdges(flow.before.edges as Edge[])}
            />
          </ReactFlowProvider>
        </div>
      </div>
      <div className="p-4">
        <p
          className={`font-pixel-square text-[10px] font-medium tracking-widest ${afterLabelColor} mb-3`}
        >
          AFTER
        </p>
        <div className="h-[240px]">
          <ReactFlowProvider>
            <FlowPanel
              nodes={toHorizontalNodes(flow.after.nodes as Node[])}
              edges={toHorizontalEdges(flow.after.edges as Edge[])}
            />
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}
