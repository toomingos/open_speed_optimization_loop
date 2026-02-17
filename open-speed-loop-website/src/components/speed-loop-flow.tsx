"use client";

import { useEffect, useState } from "react";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  Node,
  Edge,
  MarkerType,
  BackgroundVariant,
  useReactFlow,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const phases = [
  { id: "1", label: "Understand", position: { x: 0, y: 0 } },
  { id: "2", label: "Decompose", position: { x: 200, y: 0 } },
  { id: "3", label: "Analyze", position: { x: 400, y: 0 } },
  { id: "4", label: "Implement", position: { x: 400, y: 80 } },
  { id: "5", label: "Verify", position: { x: 200, y: 80 } },
  { id: "6", label: "Integrate", position: { x: 0, y: 80 } },
];

const initialNodes: Node[] = phases.map((phase) => ({
  id: phase.id,
  position: phase.position,
  data: { label: phase.label },
  type: "phaseCard",
  draggable: false,
  selectable: false,
}));

const edgeStyle = { stroke: "hsl(24 5.4% 25%)", strokeWidth: 1.5 };
const markerEnd = {
  type: MarkerType.ArrowClosed,
  color: "hsl(24 5.4% 25%)",
  width: 8,
  height: 8,
};

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", sourceHandle: "right-source", targetHandle: "left-target", type: "smoothstep", animated: true, style: edgeStyle, markerEnd },
  { id: "e2-3", source: "2", target: "3", sourceHandle: "right-source", targetHandle: "left-target", type: "smoothstep", animated: true, style: edgeStyle, markerEnd },
  { id: "e3-4", source: "3", target: "4", sourceHandle: "bottom-source", targetHandle: "top-target", type: "smoothstep", animated: true, style: edgeStyle, markerEnd },
  { id: "e4-5", source: "4", target: "5", sourceHandle: "left-source", targetHandle: "right-target", type: "smoothstep", animated: true, style: edgeStyle, markerEnd },
  { id: "e5-6", source: "5", target: "6", sourceHandle: "left-source", targetHandle: "right-target", type: "smoothstep", animated: true, style: edgeStyle, markerEnd },
  { id: "e6-1", source: "6", target: "1", sourceHandle: "top-source", targetHandle: "bottom-target", type: "smoothstep", animated: true, style: { ...edgeStyle, strokeDasharray: "4 2" }, markerEnd },
];

type PhaseCardProps = {
  data: { label: string };
  id: string;
};

function PhaseCard({ data, id }: PhaseCardProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentPhase = Math.floor(Date.now() / 1500) % 6;
      setActive(parseInt(id) === currentPhase + 1);
    }, 100);
    return () => clearInterval(interval);
  }, [id]);

  const handleStyle = {
    opacity: 0,
    width: 6,
    height: 6,
    background: "transparent",
    border: "none",
  };

  return (
    <>
      <Handle type="target" position={Position.Left} id="left-target" style={handleStyle} isConnectable={false} />
      <Handle type="source" position={Position.Left} id="left-source" style={handleStyle} isConnectable={false} />
      <Handle type="source" position={Position.Right} id="right-source" style={handleStyle} isConnectable={false} />
      <Handle type="target" position={Position.Right} id="right-target" style={handleStyle} isConnectable={false} />
      <Handle type="source" position={Position.Top} id="top-source" style={handleStyle} isConnectable={false} />
      <Handle type="target" position={Position.Top} id="top-target" style={handleStyle} isConnectable={false} />
      <Handle type="source" position={Position.Bottom} id="bottom-source" style={handleStyle} isConnectable={false} />
      <Handle type="target" position={Position.Bottom} id="bottom-target" style={handleStyle} isConnectable={false} />

      <div
        className={`flex items-center justify-center gap-2 w-[140px] h-9 px-3 rounded border transition-all duration-300 ${
          active
            ? "bg-secondary border-muted-foreground/30"
            : "bg-background border-border"
        }`}
      >
        <div
          className={`text-sm font-medium transition-all duration-300 tabular-nums ${
            active ? "text-muted-foreground" : "text-muted-foreground/50"
          }`}
        >
          {id}
        </div>
        <div
          className={`font-pixel-square text-xs transition-all duration-300 ${
            active ? "text-foreground" : "text-muted-foreground/50"
          }`}
        >
          {data.label}
        </div>
      </div>
    </>
  );
}

const nodeTypes = {
  phaseCard: PhaseCard,
};

function FlowContent() {
  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);
  const { fitView } = useReactFlow();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setTimeout(() => {
        fitView({ padding: 0.15, duration: 200 });
      }, 50);
    }
  }, [mounted, fitView]);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-background flex items-center justify-center">
        <div className="text-muted-foreground/30 text-xs">Loading...</div>
      </div>
    );
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.15 }}
      panOnDrag={false}
      zoomOnScroll={false}
      zoomOnPinch={false}
      panOnScroll={false}
      selectionOnDrag={false}
      minZoom={0.5}
      maxZoom={1.5}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      proOptions={{ hideAttribution: true }}
    >
      <Background
        color="hsl(12 6.5% 15.1%)"
        gap={20}
        size={1}
        variant={BackgroundVariant.Dots}
      />
    </ReactFlow>
  );
}

export function SpeedLoopFlow() {
  return (
    <div className="w-full h-[160px]">
      <ReactFlowProvider>
        <FlowContent />
      </ReactFlowProvider>

      <div className="flex justify-center mt-2">
        <div className="flex items-center gap-2 px-3 py-1 border border-border">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="animate-pulse text-muted-foreground/30"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          <span
            className="font-pixel-square text-[10px] tracking-[0.2em] text-muted-foreground"
          >
            CONTINUOUS
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="animate-pulse text-muted-foreground/30"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
