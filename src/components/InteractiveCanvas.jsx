import { useEffect, useRef, useState } from "react";

export default function InteractiveCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({ width: clientWidth, height: clientHeight });
        
        // Update canvas sizing
        const canvas = canvasRef.current;
        canvas.width = clientWidth;
        canvas.height = clientHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Trigger first

    // Mouse movement physics tracker
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Store relative coordinates (-0.5 to 0.5) centered on the elements group
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Canvas render frame loops
    let animationId;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      
      // Items coordinates
      const shapes = [
        {
          type: "cube",
          x: -120,
          y: -60,
          z: 0,
          size: 70,
          rotX: 0.3,
          rotY: 0.4,
          rotZ: 0.1,
          rotSpeedX: 0.005,
          rotSpeedY: 0.007,
          color: "#18181b",
          borderColor: "rgba(6, 182, 212, 0.45)", // Cyan
          parallaxStr: 15,
        },
        {
          type: "cylinder",
          x: 100,
          y: 90,
          z: -50,
          radius: 35,
          height: 90,
          rotX: 0.7,
          rotY: 0.2,
          rotSpeedX: -0.004,
          rotSpeedY: 0.003,
          color: "#27272a",
          borderColor: "rgba(168, 85, 247, 0.4)", // Purple
          parallaxStr: -25,
        },
        {
          type: "sphere",
          x: 130,
          y: -80,
          z: 50,
          radius: 20,
          pulse: 0,
          color: "rgba(249, 115, 22, 0.85)", // Orange-yellow core
          glowColor: "rgba(249, 115, 22, 0.4)",
          parallaxStr: 35,
        },
      ];

      // Drawing helper for projection
      const project = (x, y, z, centerX, centerY) => {
        // Simple perspective projection helper
        const fov = 400;
        const scale = fov / (fov + z);
        return {
          x: x * scale + centerX,
          y: y * scale + centerY,
          scale: scale,
        };
      };

      const drawLoop = () => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Smoothly interpolate mouse follow
        const mouse = mouseRef.current;
        mouse.x += (mouse.targetX - mouse.x) * 0.06;
        mouse.y += (mouse.targetY - mouse.y) * 0.06;

        // Draw an ambient subtle tech grid in the background
        ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
        ctx.lineWidth = 1;
        const gridSize = 40;
        const gridShiftX = mouse.x * -10;
        const gridShiftY = mouse.y * -10;

        for (let x = gridShiftX % gridSize; x < canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = gridShiftY % gridSize; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        // Draw shapes
        shapes.forEach((shape) => {
          // Add parallax displacement
          const dx = mouse.x * shape.parallaxStr;
          const dy = mouse.y * shape.parallaxStr;
          const sx = shape.x + dx;
          const sy = shape.y + dy;

          if (shape.type === "cube") {
            // Update rotation angles
            shape.rotX += shape.rotSpeedX;
            shape.rotY += shape.rotSpeedY;

            // Define 8 vertices of a standard cube centered at sx, sy, z
            const vertices = [
              { x: -1, y: -1, z: -1 },
              { x: 1, y: -1, z: -1 },
              { x: 1, y: 1, z: -1 },
              { x: -1, y: 1, z: -1 },
              { x: -1, y: -1, z: 1 },
              { x: 1, y: -1, z: 1 },
              { x: 1, y: 1, z: 1 },
              { x: -1, y: 1, z: 1 },
            ];

            // Rotate coordinates around local axes
            const rotated = vertices.map((v) => {
              // Scale to size
              let x = v.x * (shape.size / 2);
              let y = v.y * (shape.size / 2);
              let z = v.z * (shape.size / 2);

              // Rotate X
              let cosX = Math.cos(shape.rotX), sinX = Math.sin(shape.rotX);
              let y1 = y * cosX - z * sinX;
              let z1 = y * sinX + z * cosX;

              // Rotate Y
              let cosY = Math.cos(shape.rotY), sinY = Math.sin(shape.rotY);
              let x2 = x * cosY + z1 * sinY;
              let z2 = -x * sinY + z1 * cosY;

              return { x: x2 + sx, y: y1 + sy, z: z2 + shape.z };
            });

            // Projection vertices
            const proj = rotated.map((r) => project(r.x, r.y, r.z, centerX, centerY));

            // Face connectivity
            const faces = [
              [0, 1, 2, 3], // Front
              [4, 5, 6, 7], // Back
              [0, 1, 5, 4], // Top
              [2, 3, 7, 6], // Bottom
              [0, 3, 7, 4], // Left
              [1, 2, 6, 5], // Right
            ];

            // Calculate active face depths for rendering sort
            const faceWithDepth = faces.map((face, index) => {
              const avgZ = face.reduce((sum, vertexIdx) => sum + rotated[vertexIdx].z, 0) / 4;
              return { face, avgZ, index };
            });

            // Sort faces back-to-front
            faceWithDepth.sort((a, b) => b.avgZ - a.avgZ);

            // Draw solid faces with lighting gradient
            faceWithDepth.forEach(({ face }) => {
              ctx.beginPath();
              ctx.moveTo(proj[face[0]].x, proj[face[0]].y);
              for (let i = 1; i < 4; i++) {
                ctx.lineTo(proj[face[i]].x, proj[face[i]].y);
              }
              ctx.closePath();

              // Face coloring with subtle gradient to convey 3D depth
              ctx.fillStyle = shape.color;
              ctx.fill();

              // Face outer wire edges
              ctx.strokeStyle = shape.borderColor;
              ctx.lineWidth = 1;
              ctx.stroke();
            });

          } else if (shape.type === "cylinder") {
            // Rotates around X and Y
            shape.rotX += shape.rotSpeedX;
            shape.rotY += shape.rotSpeedY;

            // Generate circle points at top and bottom of cylinder
            const numPoints = 12;
            const topPoints = [];
            const bottomPoints = [];

            for (let i = 0; i < numPoints; i++) {
              const angle = (i * 2 * Math.PI) / numPoints;
              // Circle horizontal plane
              const radX = Math.cos(angle) * shape.radius;
              const radZ = Math.sin(angle) * shape.radius;

              topPoints.push({ x: radX, y: -shape.height / 2, z: radZ });
              bottomPoints.push({ x: radX, y: shape.height / 2, z: radZ });
            }

            // Function to rotate local points
            const rotatePoint = (p) => {
              let { x, y, z } = p;
              // Rotate X
              let cosX = Math.cos(shape.rotX), sinX = Math.sin(shape.rotX);
              let y1 = y * cosX - z * sinX;
              let z1 = y * sinX + z * cosX;

              // Rotate Y
              let cosY = Math.cos(shape.rotY), sinY = Math.sin(shape.rotY);
              let x2 = x * cosY + z1 * sinY;
              let z2 = -x * sinY + z1 * cosY;

              return { x: x2 + sx, y: y1 + sy, z: z2 + shape.z };
            };

            const rotTop = topPoints.map(rotatePoint);
            const rotBottom = bottomPoints.map(rotatePoint);

            const projTop = rotTop.map((r) => project(r.x, r.y, r.z, centerX, centerY));
            const projBottom = rotBottom.map((r) => project(r.x, r.y, r.z, centerX, centerY));

            // Draw vertical skeletal lines connecting top and bottom
            ctx.strokeStyle = "rgba(168, 85, 247, 0.15)";
            ctx.lineWidth = 1.2;
            for (let i = 0; i < numPoints; i++) {
              ctx.beginPath();
              ctx.moveTo(projTop[i].x, projTop[i].y);
              ctx.lineTo(projBottom[i].x, projBottom[i].y);
              ctx.stroke();
            }

            // Draw Top Ring
            ctx.beginPath();
            ctx.moveTo(projTop[0].x, projTop[0].y);
            for (let i = 1; i < numPoints; i++) {
              ctx.lineTo(projTop[i].x, projTop[i].y);
            }
            ctx.closePath();
            ctx.fillStyle = shape.color;
            ctx.fill();
            ctx.strokeStyle = shape.borderColor;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Draw Bottom Ring
            ctx.beginPath();
            ctx.moveTo(projBottom[0].x, projBottom[0].y);
            for (let i = 1; i < numPoints; i++) {
              ctx.lineTo(projBottom[i].x, projBottom[i].y);
            }
            ctx.closePath();
            ctx.fillStyle = shape.color;
            ctx.fill();
            ctx.strokeStyle = shape.borderColor;
            ctx.stroke();

          } else if (shape.type === "sphere") {
            shape.pulse += 0.035;
            const currentPulse = Math.sin(shape.pulse) * 4;
            const currentRadius = shape.radius + currentPulse;

            const projObj = project(sx, sy, shape.z, centerX, centerY);
            
            // Draw gradient halo
            const glowGrd = ctx.createRadialGradient(
              projObj.x, projObj.y, currentRadius * 0.2,
              projObj.x, projObj.y, currentRadius * 3.5
            );
            glowGrd.addColorStop(0, shape.color);
            glowGrd.addColorStop(0.2, "rgba(249, 115, 22, 0.3)");
            glowGrd.addColorStop(1, "rgba(5, 5, 5, 0)");

            ctx.fillStyle = glowGrd;
            ctx.beginPath();
            ctx.arc(projObj.x, projObj.y, currentRadius * 3.5, 0, 2 * Math.PI);
            ctx.fill();

            // Draw physical center sphere
            const sphereGrd = ctx.createRadialGradient(
              projObj.x - currentRadius * 0.3, projObj.y - currentRadius * 0.3, currentRadius * 0.1,
              projObj.x, projObj.y, currentRadius
            );
            sphereGrd.addColorStop(0, "#ffe0b2"); // White-yellow reflection dot
            sphereGrd.addColorStop(0.5, shape.color);
            sphereGrd.addColorStop(1, "#3e2723"); // Solid rich drop Shadow

            ctx.fillStyle = sphereGrd;
            ctx.beginPath();
            ctx.arc(projObj.x, projObj.y, currentRadius, 0, 2 * Math.PI);
            ctx.fill();

            // Tiny orbit ring
            ctx.beginPath();
            ctx.ellipse(projObj.x, projObj.y, currentRadius * 3.5, currentRadius * 1.5, Math.PI / 6, 0, 2 * Math.PI);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });

        // Request next frame
        animationId = requestAnimationFrame(drawLoop);
      };

      animationId = requestAnimationFrame(drawLoop);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      id="canvas-container"
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-75 md:opacity-90 transition-opacity duration-1000"
      />
    </div>
  );
}
