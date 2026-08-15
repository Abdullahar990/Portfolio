'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

const PipelineSequence = ({
  projectSlug = 'guardiansense',
  stages = [],
  title = 'System Architecture Sequence',
  subtitle = 'Scroll to scrub through live operational pipeline stages',
}) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const sceneRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    rootGroup: null,
    reqId: null,
  });

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) {
      setIsReducedMotion(true);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    ScrollTrigger.normalizeScroll(true);

    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current || !sectionRef.current) return;

    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;
    const isMobile = window.innerWidth < 768;

    // ── Three.js Scene Setup ──
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0d12, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile, // Skip MSAA on mobile for GPU efficiency
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));

    // ── Lighting ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
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

    // Swap expensive glass physical transmission material for cheaper standard material on mobile
    const glassMat = isMobile
      ? new THREE.MeshStandardMaterial({
          color: 0x3dd6c4,
          roughness: 0.15,
          metalness: 0.3,
          emissive: 0x3dd6c4,
          emissiveIntensity: 0.25,
          transparent: true,
          opacity: 0.85,
        })
      : new THREE.MeshPhysicalMaterial({
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

    // Setup master GSAP ScrollTrigger timeline with responsive pin distance
    const scrollDistance = isMobile ? 1400 : 2600;

    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${scrollDistance}`,
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
        },
      },
    });

    // ══════════════════════════════════════════════════════════
    // Differentiated 3D Behaviors per Project
    // ══════════════════════════════════════════════════════════

    if (projectSlug === 'guardiansense') {
      // ── GuardianSense: Phone Chassis Explodes into 5 Subsystem Layers ──
      const bottom = createBoxWithEdges(3.2, 0.2, 1.8, chassisMat);
      bottom.position.y = -0.3;
      rootGroup.add(bottom);

      const sensor = new THREE.Group();
      sensor.add(createBoxWithEdges(2.8, 0.1, 1.5, sensorMat));
      const waveGeom = new THREE.BufferGeometry();
      const points = [];
      const waveStep = isMobile ? 0.16 : 0.08;
      for (let i = -1.2; i <= 1.2; i += waveStep) {
        points.push(new THREE.Vector3(i, 0.08, Math.sin(i * 6) * 0.3));
      }
      waveGeom.setFromPoints(points);
      sensor.add(new THREE.Line(waveGeom, new THREE.LineBasicMaterial({ color: 0x3dd6c4 })));
      sensor.position.y = -0.1;
      rootGroup.add(sensor);

      const neural = new THREE.Group();
      neural.add(new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.2, 1.3), glassMat));
      const nodeGeom = new THREE.SphereGeometry(0.04, 8, 8);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0x3dd6c4 });
      const xStep = isMobile ? 0.8 : 0.4;
      const zStep = isMobile ? 0.8 : 0.4;
      for (let x = -0.8; x <= 0.8; x += xStep) {
        for (let z = -0.4; z <= 0.4; z += zStep) {
          const n = new THREE.Mesh(nodeGeom, nodeMat);
          n.position.set(x, 0.15, z);
          neural.add(n);
        }
      }
      neural.position.y = 0.1;
      rootGroup.add(neural);

      const anomaly = createBoxWithEdges(2.6, 0.12, 1.4, sensorMat);
      anomaly.position.y = 0.3;
      rootGroup.add(anomaly);

      const top = createBoxWithEdges(3.2, 0.2, 1.8, chassisMat);
      top.position.y = 0.5;
      rootGroup.add(top);

      const decisionCore = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.35, 0),
        new THREE.MeshBasicMaterial({ color: 0x3dd6c4 })
      );
      decisionCore.scale.set(0.01, 0.01, 0.01);
      rootGroup.add(decisionCore);

      // Scrub timeline
      masterTl
        .to(rootGroup.rotation, { y: 0.6, x: 0.25, duration: 2 }, 0)
        .to(top.position, { y: 1.8, duration: 2 }, 0)
        .to(bottom.position, { y: -1.8, duration: 2 }, 0)
        .to(sensor.position, { y: -0.9, duration: 2 }, 0)
        .to(anomaly.position, { y: 1.0, duration: 2 }, 0)
        .to(neural.position, { y: 0.1, duration: 2 }, 0);

      masterTl
        .to(rootGroup.rotation, { y: -0.4, x: 0.35, duration: 2 }, 2)
        .to(sensor.position, { y: -1.4, duration: 2 }, 2)
        .to(neural.scale, { x: 1.15, y: 1.15, z: 1.15, duration: 2 }, 2);

      masterTl
        .to(rootGroup.rotation, { y: 0.8, x: 0.15, duration: 2 }, 4)
        .to(anomaly.position, { y: 0.7, duration: 2 }, 4)
        .to(anomaly.scale, { x: 1.15, y: 1.15, z: 1.15, duration: 2 }, 4);

      masterTl
        .to(rootGroup.rotation, { y: 0, x: 0.1, duration: 2 }, 6)
        .to(top.position, { y: 0.4, duration: 2 }, 6)
        .to(bottom.position, { y: -0.4, duration: 2 }, 6)
        .to(decisionCore.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 2 }, 6)
        .to(signalLight, { intensity: 6, duration: 2 }, 6);

    } else if (projectSlug === 'check-inn') {
      // ── Check INN: 4 Flat Front-End UI Panels Slide in Space ──
      const panels = [];
      const panelConfigs = [
        { w: 3.2, h: 0.6, d: 0.05, label: 'Search Header UI', yInit: 2.5 },
        { w: 3.0, h: 1.4, d: 0.05, label: 'Room Gallery Card', yInit: 1.5 },
        { w: 2.8, h: 1.2, d: 0.05, label: 'Booking Form Panel', yInit: -0.5 },
        { w: 3.2, h: 1.0, d: 0.05, label: 'Owner Property Table', yInit: -2.0 },
      ];

      panelConfigs.forEach((cfg, idx) => {
        const p = createBoxWithEdges(cfg.w, cfg.h, cfg.d, idx === 1 ? glassMat : chassisMat);
        p.position.set((idx % 2 === 0 ? -0.3 : 0.3) * (idx + 1), (idx - 1.5) * 0.7, -idx * 0.4);
        rootGroup.add(p);
        panels.push(p);
      });

      masterTl
        .to(rootGroup.rotation, { y: 0.45, x: 0.15, duration: 2 }, 0)
        .to(panels[0].position, { x: 0, y: 1.2, z: 0, duration: 2 }, 0)
        .to(panels[1].position, { x: 0, y: 0.4, z: -0.3, duration: 2 }, 0)
        .to(panels[2].position, { x: 0, y: -0.4, z: -0.6, duration: 2 }, 0)
        .to(panels[3].position, { x: 0, y: -1.2, z: -0.9, duration: 2 }, 0);

      masterTl
        .to(rootGroup.rotation, { y: -0.35, x: 0.25, duration: 2 }, 2)
        .to(panels[1].scale, { x: 1.15, y: 1.15, z: 1.15, duration: 2 }, 2)
        .to(panels[0].position, { y: 1.5, duration: 2 }, 2);

      masterTl
        .to(rootGroup.rotation, { y: 0.2, x: 0.1, duration: 2 }, 4)
        .to(panels[2].scale, { x: 1.15, y: 1.15, z: 1.15, duration: 2 }, 4)
        .to(panels[1].scale, { x: 1.0, y: 1.0, z: 1.0, duration: 2 }, 4);

      masterTl
        .to(rootGroup.rotation, { y: 0, x: 0, duration: 2 }, 6)
        .to(panels[3].scale, { x: 1.15, y: 1.15, z: 1.15, duration: 2 }, 6);

    } else if (projectSlug === 'disease-prediction') {
      // ── Disease Prediction: KNN Neighbor Clustering & Voting ──
      const centerQuery = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xf5a623 }) // query vector
      );
      centerQuery.position.set(0, 0, 0);
      rootGroup.add(centerQuery);

      const neighborNodes = [];
      const ringGroup = new THREE.Group();
      rootGroup.add(ringGroup);

      const nodeCount = isMobile ? 12 : 24;
      const kNearestCount = isMobile ? 5 : 10;

      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const radius = 1.2 + (i % 3) * 0.6;
        const isKNearest = i < kNearestCount;
        const node = new THREE.Mesh(
          new THREE.SphereGeometry(isKNearest ? 0.1 : 0.06, 8, 8),
          new THREE.MeshStandardMaterial({
            color: isKNearest ? 0x3dd6c4 : 0x252a33,
            emissive: isKNearest ? 0x3dd6c4 : 0x000000,
            emissiveIntensity: 0.2,
          })
        );
        node.position.set(Math.cos(angle) * radius, (Math.sin(i * 3) * 0.4), Math.sin(angle) * radius);
        ringGroup.add(node);
        neighborNodes.push(node);
      }

      masterTl
        .to(rootGroup.rotation, { y: 1.0, x: 0.3, duration: 2 }, 0)
        .to(centerQuery.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 2 }, 0);

      masterTl
        .to(rootGroup.rotation, { y: 2.0, x: 0.1, duration: 2 }, 2)
        .to(ringGroup.scale, { x: 0.85, y: 0.85, z: 0.85, duration: 2 }, 2);

      masterTl
        .to(rootGroup.rotation, { y: 3.14, x: 0.25, duration: 2 }, 4)
        .to(centerQuery.scale, { x: 1.4, y: 1.4, z: 1.4, duration: 2 }, 4)
        .to(signalLight, { intensity: 5, duration: 2 }, 4);

      masterTl
        .to(rootGroup.rotation, { y: 4.2, x: 0, duration: 2 }, 6)
        .to(ringGroup.scale, { x: 0.7, y: 0.7, z: 0.7, duration: 2 }, 6)
        .to(centerQuery.position, { y: 0.2, duration: 2 }, 6);

    } else {
      // ── Spare Parts: Sequential Relational Transaction Pipeline ──
      const stagesFlow = [];
      for (let i = 0; i < 4; i++) {
        const block = createBoxWithEdges(0.7, 0.5, 0.7, i === 0 ? glassMat : sensorMat);
        block.position.set(-1.5 + i * 1.0, (i % 2 === 0 ? 0.2 : -0.2), 0);
        rootGroup.add(block);
        stagesFlow.push(block);
      }

      // Connecting conduit
      const pipeGeom = new THREE.CylinderGeometry(0.04, 0.04, 3.2, 8);
      pipeGeom.rotateZ(Math.PI / 2);
      const pipe = new THREE.Mesh(pipeGeom, new THREE.MeshBasicMaterial({ color: 0x3dd6c4, transparent: true, opacity: 0.4 }));
      pipe.position.set(0, 0, 0);
      rootGroup.add(pipe);

      masterTl
        .to(rootGroup.rotation, { y: 0.4, x: 0.2, duration: 2 }, 0)
        .to(stagesFlow[0].scale, { x: 1.25, y: 1.25, z: 1.25, duration: 2 }, 0);

      masterTl
        .to(rootGroup.rotation, { y: 0.8, x: 0.15, duration: 2 }, 2)
        .to(stagesFlow[0].scale, { x: 1.0, y: 1.0, z: 1.0, duration: 2 }, 2)
        .to(stagesFlow[1].scale, { x: 1.25, y: 1.25, z: 1.25, duration: 2 }, 2);

      masterTl
        .to(rootGroup.rotation, { y: 1.2, x: 0.25, duration: 2 }, 4)
        .to(stagesFlow[1].scale, { x: 1.0, y: 1.0, z: 1.0, duration: 2 }, 4)
        .to(stagesFlow[2].scale, { x: 1.25, y: 1.25, z: 1.25, duration: 2 }, 4);

      masterTl
        .to(rootGroup.rotation, { y: 0.1, x: 0.1, duration: 2 }, 6)
        .to(stagesFlow[2].scale, { x: 1.0, y: 1.0, z: 1.0, duration: 2 }, 6)
        .to(stagesFlow[3].scale, { x: 1.35, y: 1.35, z: 1.35, duration: 2 }, 6)
        .to(signalLight, { intensity: 6, duration: 2 }, 6);
    }

    // ── Continuous subtle idle spin ──
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      renderer.render(scene, camera);
      sceneRef.current.reqId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    const currentScene = sceneRef.current;

    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentScene.reqId) {
        cancelAnimationFrame(currentScene.reqId);
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ScrollTrigger.normalizeScroll(false);
      renderer.dispose();
    };
  }, [projectSlug, stages.length]);

  if (isReducedMotion) {
    return (
      <section className="py-24 px-6 border-t border-surface-border">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="font-mono text-xs text-signal tracking-widest uppercase block mb-2">
              Architecture Sequence
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">{title}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {stages.map((st) => (
              <div key={st.step} className="card-surface p-6">
                <span className="font-mono text-xs text-signal block mb-1">
                  {st.step} &bull; {st.tag}
                </span>
                <h3 className="font-display text-lg font-semibold text-ink mb-2">{st.title}</h3>
                <p className="text-sm text-ink-dim leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const currentStage = stages[activeStage] || stages[0] || {};

  return (
    <section ref={sectionRef} className="relative w-full bg-bg border-t border-surface-border">
      <div
        ref={containerRef}
        className="w-full h-[100dvh] relative flex items-center justify-center overflow-hidden"
      >
        {/* 3D WebGL Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-0" />

        {/* Top Floating Pinned Title */}
        <div className="absolute top-16 sm:top-20 left-4 sm:left-12 z-20 pointer-events-none max-w-[70%] sm:max-w-none">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-signal inline-block" />
            <span className="font-mono text-xs text-signal uppercase tracking-widest">
              Live Architecture Deconstruction
            </span>
          </div>
          <h2 className="font-display text-xl sm:text-3xl font-bold text-ink tracking-tight">
            {title}
          </h2>
          <p className="font-mono text-xs text-ink-dim mt-1">{subtitle}</p>
        </div>

        {/* Dynamic Scrubbed Stage Callout Card */}
        <div className="absolute bottom-6 sm:bottom-16 left-4 right-4 sm:left-auto sm:right-12 sm:max-w-md z-20 max-h-[45dvh] overflow-y-auto">
          <div className="card-surface p-5 sm:p-6 backdrop-blur-md bg-surface/90 border-signal/30 shadow-2xl">
            {/* Stage Progress Bar */}
            <div className="flex items-center justify-between gap-1 mb-4">
              {stages.map((st, idx) => (
                <div
                  key={st.step}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    idx <= activeStage ? 'bg-signal' : 'bg-surface-border'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-signal tracking-widest uppercase">
                Stage {currentStage.step} &bull; {currentStage.tag}
              </span>
            </div>

            <h3 className="font-display text-lg sm:text-xl font-bold text-ink mb-2">
              {currentStage.title}
            </h3>

            <p className="text-xs sm:text-sm text-ink-dim leading-relaxed mb-4">
              {currentStage.desc}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-surface-border text-xs font-mono text-ink-dim">
              <span>{projectSlug.toUpperCase()} RUNTIME</span>
              <span className="text-signal">Layer {activeStage + 1} / {stages.length}</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator Prompt */}
        <div
          className={`hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-20 items-center gap-1.5 font-mono text-xs text-ink-dim transition-opacity duration-300 ${
            activeStage === 0 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span>Scroll to scrub</span>
          <ChevronDown className="w-3.5 h-3.5 text-signal animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default PipelineSequence;
