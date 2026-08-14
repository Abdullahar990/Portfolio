'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, ChevronLeft, Activity, ShieldCheck, Database, Layers, ArrowRight } from 'lucide-react';

const PipelineSequence = ({
  projectSlug = 'guardiansense',
  stages = [],
  mode = 'click', // 'scroll' or 'click'
  title = 'System Architecture Pipeline',
  subtitle = 'Deconstructed Execution Flow',
  onStageChange = null,
}) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // References to 3D objects for tweening across stages
  const sceneStateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    rootGroup: null,
    layers: [],
    coreMesh: null,
    lights: {},
    reqId: null,
  });

  const handleStageSelect = (idx) => {
    setActiveStage(idx);
    if (onStageChange) onStageChange(idx);
  };

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) {
      setIsReducedMotion(true);
      return;
    }

    if (mode === 'scroll') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 800;
    const height = containerRef.current.clientHeight || 500;

    // ── Three.js Scene Setup ──
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0d12, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // ── Lighting ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const signalLight = new THREE.PointLight(0x3dd6c4, 3, 20);
    signalLight.position.set(0, 0, 2);
    scene.add(signalLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // ── Materials ──
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x151921,
      roughness: 0.3,
      metalness: 0.8,
    });

    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x3dd6c4,
      transparent: true,
      opacity: 0.35,
    });

    const sensorMat = new THREE.MeshStandardMaterial({
      color: 0x1a2332,
      roughness: 0.2,
      metalness: 0.85,
      emissive: 0x3dd6c4,
      emissiveIntensity: 0.15,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x3dd6c4,
      transmission: 0.75,
      opacity: 0.9,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
      thickness: 0.4,
      emissive: 0x3dd6c4,
      emissiveIntensity: 0.2,
    });

    const createBoxWithEdges = (w, h, d, mat) => {
      const g = new THREE.Group();
      const geom = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geom, mat);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geom), edgeMat);
      g.add(mesh);
      g.add(edges);
      return g;
    };

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    const layers = [];
    let coreMesh = null;

    // ── Build 3D Primitives based on projectSlug ──
    if (projectSlug === 'guardiansense') {
      // 5-Stage Sensor to Decision Deconstruction
      const bottom = createBoxWithEdges(3.2, 0.2, 1.8, chassisMat);
      bottom.position.y = -0.3;
      rootGroup.add(bottom);
      layers.push(bottom);

      const sensor = new THREE.Group();
      sensor.add(createBoxWithEdges(2.8, 0.1, 1.5, sensorMat));
      const waveGeom = new THREE.BufferGeometry();
      const points = [];
      for (let i = -1.2; i <= 1.2; i += 0.08) {
        points.push(new THREE.Vector3(i, 0.08, Math.sin(i * 6) * 0.3));
      }
      waveGeom.setFromPoints(points);
      sensor.add(new THREE.Line(waveGeom, new THREE.LineBasicMaterial({ color: 0x3dd6c4 })));
      sensor.position.y = -0.1;
      rootGroup.add(sensor);
      layers.push(sensor);

      const neural = new THREE.Group();
      neural.add(new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.2, 1.3), glassMat));
      const nodeGeom = new THREE.SphereGeometry(0.04, 8, 8);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0x3dd6c4 });
      for (let x = -0.8; x <= 0.8; x += 0.4) {
        for (let z = -0.4; z <= 0.4; z += 0.4) {
          const n = new THREE.Mesh(nodeGeom, nodeMat);
          n.position.set(x, 0.15, z);
          neural.add(n);
        }
      }
      neural.position.y = 0.1;
      rootGroup.add(neural);
      layers.push(neural);

      const anomaly = createBoxWithEdges(2.6, 0.12, 1.4, sensorMat);
      anomaly.position.y = 0.3;
      rootGroup.add(anomaly);
      layers.push(anomaly);

      const top = createBoxWithEdges(3.2, 0.2, 1.8, chassisMat);
      top.position.y = 0.5;
      rootGroup.add(top);
      layers.push(top);

      coreMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.35, 0), new THREE.MeshBasicMaterial({ color: 0x3dd6c4 }));
      coreMesh.scale.set(0.01, 0.01, 0.01);
      rootGroup.add(coreMesh);
    } else if (projectSlug === 'check-inn') {
      // 4-Layer Stack: Client Request -> Auth -> Booking Engine -> REST API
      const layerNames = ['Client Request', 'JWT Auth Guard', 'Booking Engine & DB', 'Express Confirmation'];
      layerNames.forEach((_, i) => {
        const mat = i === 1 ? glassMat : i === 2 ? sensorMat : chassisMat;
        const layer = createBoxWithEdges(3.0 - i * 0.2, 0.18, 1.6 - i * 0.1, mat);
        layer.position.y = (i - 1.5) * 0.25;
        rootGroup.add(layer);
        layers.push(layer);
      });
      coreMesh = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), glassMat);
      coreMesh.position.set(0, 0, 0);
      coreMesh.scale.set(0.01, 0.01, 0.01);
      rootGroup.add(coreMesh);
    } else if (projectSlug === 'disease-prediction') {
      // 4 ML Classifiers Model Nodes (RF, SVM, KNN, LR)
      const basePlatform = createBoxWithEdges(3.4, 0.15, 2.0, chassisMat);
      basePlatform.position.y = -0.5;
      rootGroup.add(basePlatform);
      layers.push(basePlatform);

      const modelsGroup = new THREE.Group();
      const offsets = [
        [-1.0, 0, -0.4],
        [1.0, 0, -0.4],
        [-1.0, 0, 0.4],
        [1.0, 0, 0.4],
      ];
      offsets.forEach((pos, i) => {
        const m = createBoxWithEdges(0.7, 0.4, 0.5, i === 0 ? glassMat : sensorMat);
        m.position.set(pos[0], pos[1], pos[2]);
        modelsGroup.add(m);
      });
      rootGroup.add(modelsGroup);
      layers.push(modelsGroup);

      coreMesh = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), new THREE.MeshBasicMaterial({ color: 0x3dd6c4 }));
      coreMesh.position.set(0, 0.4, 0);
      coreMesh.scale.set(0.01, 0.01, 0.01);
      rootGroup.add(coreMesh);
    } else {
      // spare-parts: 4 Sequential Logistics Flow Blocks
      const baseTrack = createBoxWithEdges(3.6, 0.1, 1.2, chassisMat);
      baseTrack.position.y = -0.4;
      rootGroup.add(baseTrack);
      layers.push(baseTrack);

      const blocksGroup = new THREE.Group();
      for (let i = 0; i < 4; i++) {
        const b = createBoxWithEdges(0.65, 0.35, 0.7, i === 3 ? glassMat : sensorMat);
        b.position.x = -1.2 + i * 0.8;
        b.position.y = 0;
        blocksGroup.add(b);
      }
      rootGroup.add(blocksGroup);
      layers.push(blocksGroup);

      coreMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.3, 0), new THREE.MeshBasicMaterial({ color: 0x3dd6c4 }));
      coreMesh.position.set(1.2, 0.4, 0);
      coreMesh.scale.set(0.01, 0.01, 0.01);
      rootGroup.add(coreMesh);
    }

    sceneStateRef.current = {
      scene,
      camera,
      renderer,
      rootGroup,
      layers,
      coreMesh,
      lights: { ambientLight, signalLight, dirLight },
      reqId: null,
    };

    // ── Render Loop ──
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      if (coreMesh) {
        coreMesh.rotation.y = elapsed * 1.5;
        coreMesh.rotation.x = elapsed * 0.7;
      }
      renderer.render(scene, camera);
      sceneStateRef.current.reqId = requestAnimationFrame(animate);
    };
    animate();

    // ── Mode: Scroll vs Click ──
    if (mode === 'scroll' && sectionRef.current) {
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2600',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const stageIndex = Math.min(
              Math.floor(progress * stages.length),
              stages.length - 1
            );
            setActiveStage(stageIndex);
            if (onStageChange) onStageChange(stageIndex);
          },
        },
      });

      if (layers.length >= 5) {
        masterTl
          .to(rootGroup.rotation, { y: 0.6, x: 0.25, duration: 2 }, 0)
          .to(layers[4].position, { y: 1.8, duration: 2 }, 0) // top
          .to(layers[0].position, { y: -1.8, duration: 2 }, 0) // bottom
          .to(layers[1].position, { y: -0.9, duration: 2 }, 0) // sensor
          .to(layers[3].position, { y: 1.0, duration: 2 }, 0) // anomaly
          .to(layers[2].position, { y: 0.1, duration: 2 }, 0); // neural

        masterTl
          .to(rootGroup.rotation, { y: -0.4, x: 0.35, duration: 2 }, 2)
          .to(layers[1].position, { y: -1.4, duration: 2 }, 2)
          .to(layers[2].scale, { x: 1.15, y: 1.15, z: 1.15, duration: 2 }, 2);

        masterTl
          .to(rootGroup.rotation, { y: 0.8, x: 0.15, duration: 2 }, 4)
          .to(layers[3].position, { y: 0.7, duration: 2 }, 4)
          .to(layers[3].scale, { x: 1.15, y: 1.15, z: 1.15, duration: 2 }, 4);

        masterTl
          .to(rootGroup.rotation, { y: 0, x: 0.1, duration: 2 }, 6)
          .to(layers[4].position, { y: 0.4, duration: 2 }, 6)
          .to(layers[0].position, { y: -0.4, duration: 2 }, 6)
          .to(layers[1].position, { y: -0.15, duration: 2 }, 6)
          .to(layers[3].position, { y: 0.15, duration: 2 }, 6)
          .to(coreMesh.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 2 }, 6)
          .to(signalLight, { intensity: 6, duration: 2 }, 6);
      }
    }

    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneStateRef.current.reqId) {
        cancelAnimationFrame(sceneStateRef.current.reqId);
      }
      if (mode === 'scroll') {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      }
      renderer.dispose();
    };
  }, [projectSlug, mode, stages.length, onStageChange]);

  // ── Handle Stage Transitions in "click" mode ──
  useEffect(() => {
    if (mode !== 'click') return;
    const { rootGroup, layers, coreMesh } = sceneStateRef.current;
    if (!rootGroup || layers.length === 0) return;

    const total = stages.length || 4;
    const progress = activeStage / (total - 1 || 1);

    gsap.killTweensOf(rootGroup.rotation);
    gsap.to(rootGroup.rotation, {
      y: (progress - 0.5) * 1.2,
      x: 0.25 + (progress - 0.5) * 0.2,
      duration: 0.6,
      ease: 'power2.out',
    });

    if (projectSlug === 'guardiansense' && layers.length >= 5) {
      const spread = progress * 1.5;
      gsap.to(layers[4].position, { y: 0.5 + spread * 0.9, duration: 0.6 });
      gsap.to(layers[0].position, { y: -0.3 - spread * 0.9, duration: 0.6 });
      gsap.to(layers[1].position, { y: -0.1 - spread * 0.5, duration: 0.6 });
      gsap.to(layers[3].position, { y: 0.3 + spread * 0.5, duration: 0.6 });
      if (coreMesh) {
        gsap.to(coreMesh.scale, {
          x: progress > 0.8 ? 1.2 : 0.01,
          y: progress > 0.8 ? 1.2 : 0.01,
          z: progress > 0.8 ? 1.2 : 0.01,
          duration: 0.5,
        });
      }
    } else if (projectSlug === 'check-inn') {
      layers.forEach((layer, idx) => {
        const isTarget = idx === activeStage;
        const targetY = (idx - 1.5) * (0.25 + progress * 0.35);
        gsap.to(layer.position, { y: targetY, duration: 0.6 });
        gsap.to(layer.scale, {
          x: isTarget ? 1.1 : 1.0,
          y: isTarget ? 1.1 : 1.0,
          z: isTarget ? 1.1 : 1.0,
          duration: 0.5,
        });
      });
    } else if (projectSlug === 'disease-prediction') {
      if (layers[1]) {
        layers[1].children.forEach((mesh, idx) => {
          const isWinner = idx === 0 && activeStage === 3;
          gsap.to(mesh.scale, {
            x: isWinner ? 1.25 : 1.0,
            y: isWinner ? 1.25 : 1.0,
            z: isWinner ? 1.25 : 1.0,
            duration: 0.5,
          });
        });
      }
      if (coreMesh) {
        gsap.to(coreMesh.scale, {
          x: activeStage === 3 ? 1.0 : 0.01,
          y: activeStage === 3 ? 1.0 : 0.01,
          z: activeStage === 3 ? 1.0 : 0.01,
          duration: 0.5,
        });
      }
    } else if (projectSlug === 'spare-parts') {
      if (layers[1]) {
        layers[1].children.forEach((mesh, idx) => {
          const isCurrent = idx === activeStage;
          gsap.to(mesh.position, {
            y: isCurrent ? 0.2 : 0,
            duration: 0.4,
          });
          gsap.to(mesh.scale, {
            x: isCurrent ? 1.15 : 1.0,
            y: isCurrent ? 1.15 : 1.0,
            z: isCurrent ? 1.15 : 1.0,
            duration: 0.4,
          });
        });
      }
    }
  }, [activeStage, mode, projectSlug, stages.length]);

  if (isReducedMotion) {
    return (
      <div className="card-surface p-6">
        <div className="mb-6">
          <span className="font-mono text-xs text-signal tracking-widest uppercase block mb-1">
            {subtitle}
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-ink">{title}</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {stages.map((st) => (
            <div key={st.step} className="p-4 rounded-lg bg-bg border border-surface-border">
              <span className="font-mono text-xs text-signal block mb-1">
                {st.step} &bull; {st.tag}
              </span>
              <h4 className="font-display font-semibold text-ink text-sm mb-1">{st.title}</h4>
              <p className="text-xs text-ink-dim leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentStage = stages[activeStage] || stages[0] || {};
  const isScroll = mode === 'scroll';

  return (
    <div
      ref={sectionRef}
      className={`relative w-full ${
        isScroll ? 'h-screen' : 'h-[460px] sm:h-[500px] rounded-xl overflow-hidden border border-surface-border bg-bg'
      }`}
    >
      <div
        ref={containerRef}
        className="w-full h-full relative flex items-center justify-center overflow-hidden"
      >
        {/* 3D WebGL Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-0" />

        {/* Section Header Overlay (For scroll mode) */}
        {isScroll && (
          <div className="absolute top-20 left-6 sm:left-12 z-20 pointer-events-none">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-signal inline-block" />
              <span className="font-mono text-xs text-signal uppercase tracking-widest">
                Live Pipeline Deconstruction
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink tracking-tight">
              {title}
            </h2>
            <p className="font-mono text-xs text-ink-dim mt-1">{subtitle}</p>
          </div>
        )}

        {/* Click Mode: Step Controls Bar */}
        {!isScroll && (
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 overflow-x-auto py-1">
              {stages.map((st, idx) => (
                <button
                  key={st.step}
                  onClick={() => handleStageSelect(idx)}
                  className={`font-mono text-xs px-2.5 py-1 rounded-md transition-colors duration-200 whitespace-nowrap ${
                    idx === activeStage
                      ? 'bg-signal/20 text-signal border border-signal/50 font-bold'
                      : 'bg-surface/80 text-ink-dim border border-surface-border hover:text-ink'
                  }`}
                  aria-label={`Switch to stage ${st.step}: ${st.title}`}
                >
                  {st.step} {st.tag.split(' ')[0]}
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => handleStageSelect(Math.max(0, activeStage - 1))}
                disabled={activeStage === 0}
                className="p-1.5 rounded bg-surface/80 border border-surface-border text-ink-dim hover:text-signal disabled:opacity-30"
                aria-label="Previous stage"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleStageSelect(Math.min(stages.length - 1, activeStage + 1))}
                disabled={activeStage === stages.length - 1}
                className="p-1.5 rounded bg-surface/80 border border-surface-border text-ink-dim hover:text-signal disabled:opacity-30"
                aria-label="Next stage"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Scrubbed/Selected Stage Callout Card */}
        <div
          className={`absolute z-20 ${
            isScroll
              ? 'bottom-12 sm:bottom-16 left-6 right-6 sm:left-auto sm:right-12 sm:max-w-md'
              : 'bottom-4 left-4 right-4 sm:max-w-sm'
          }`}
        >
          <div className="card-surface p-4 sm:p-5 backdrop-blur-md bg-surface/90 border-signal/30 shadow-xl">
            {/* Stage Progress Bar */}
            <div className="flex items-center justify-between gap-1 mb-3">
              {stages.map((st, idx) => (
                <div
                  key={st.step}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    idx <= activeStage ? 'bg-signal' : 'bg-surface-border'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-mono text-xs font-bold text-signal tracking-wider uppercase">
                Stage {currentStage.step} &bull; {currentStage.tag}
              </span>
            </div>

            <h3 className="font-display text-base sm:text-lg font-bold text-ink mb-1.5 leading-snug">
              {currentStage.title}
            </h3>

            <p className="text-xs text-ink-dim leading-relaxed mb-3">
              {currentStage.desc}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-surface-border text-xs font-mono text-ink-dim">
              <span>{projectSlug.toUpperCase()}</span>
              <span className="text-signal">Active Layer {activeStage + 1}/{stages.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineSequence;
