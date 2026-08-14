'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Activity, ShieldAlert, CheckCircle2, ChevronDown } from 'lucide-react';

const stages = [
  {
    step: '00',
    tag: 'SYSTEM ASSEMBLED',
    title: 'GuardianSense Edge Architecture',
    desc: 'An integrated safety-critical runtime executing continuous on-device inference without cloud dependency.',
    icon: Cpu,
  },
  {
    step: '01',
    tag: 'TELEMETRY INGESTION',
    title: 'Raw Sensor Stream (IMU)',
    desc: 'High-frequency 3-axis accelerometer and gyroscope signals sampled continuously at 50Hz to capture motion dynamics.',
    icon: Activity,
  },
  {
    step: '02',
    tag: 'NEURAL RECONSTRUCTION',
    title: 'BiLSTM Autoencoder',
    desc: 'Bidirectional temporal network compresses and reconstructs nominal motion patterns, establishing baseline kinematics.',
    icon: Cpu,
  },
  {
    step: '03',
    tag: 'ANOMALY ISOLATION',
    title: 'Isolation Forest Scoring',
    desc: 'Tree-based anomaly detector evaluates reconstruction error residuals to isolate sudden impacts, falls, and abnormal spikes.',
    icon: ShieldAlert,
  },
  {
    step: '04',
    tag: 'INCIDENT DISPATCH',
    title: 'Real-Time Edge Decision',
    desc: 'Confidence score crosses threshold (>92% accuracy). Incident state triggers emergency dispatch in <800ms.',
    icon: CheckCircle2,
  },
];

const ArchitectureSequence = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const labelRefs = useRef([]);
  const [activeStage, setActiveStage] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) {
      setIsReducedMotion(true);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current || !sectionRef.current) return;

    // ── Three.js Scene Setup ──
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0d12, 0.04);

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const signalLight = new THREE.PointLight(0x3dd6c4, 3, 20);
    signalLight.position.set(0, 0, 2);
    scene.add(signalLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 1.2);
    topLight.position.set(5, 10, 7);
    scene.add(topLight);

    // ── Materials ──
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x151921,
      roughness: 0.3,
      metalness: 0.8,
    });

    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x3dd6c4,
      transparent: true,
      opacity: 0.3,
    });

    const sensorMat = new THREE.MeshStandardMaterial({
      color: 0x1a2332,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x3dd6c4,
      emissiveIntensity: 0.15,
    });

    const neuralMat = new THREE.MeshPhysicalMaterial({
      color: 0x3dd6c4,
      transmission: 0.8,
      opacity: 0.9,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
      thickness: 0.5,
      emissive: 0x3dd6c4,
      emissiveIntensity: 0.2,
    });

    const coreGlowMat = new THREE.MeshBasicMaterial({
      color: 0x3dd6c4,
      transparent: true,
      opacity: 0.9,
    });

    // Helper to create wireframe border box
    const createChassisLayer = (w, h, d, material) => {
      const group = new THREE.Group();
      const geom = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geom, material);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geom), edgeMat);
      group.add(mesh);
      group.add(edges);
      return group;
    };

    // ── Build 3D Explode Pipeline Group ──
    const pipelineRoot = new THREE.Group();
    scene.add(pipelineRoot);

    // 1. Bottom Housing
    const bottomChassis = createChassisLayer(3.2, 0.2, 1.8, chassisMat);
    bottomChassis.position.y = -0.3;
    pipelineRoot.add(bottomChassis);

    // 2. Sensor Layer (IMU Grid)
    const sensorLayer = new THREE.Group();
    const sensorBase = createChassisLayer(2.8, 0.1, 1.5, sensorMat);
    sensorLayer.add(sensorBase);

    // Waveform lines on sensor plate
    const waveGeom = new THREE.BufferGeometry();
    const wavePoints = [];
    for (let i = -1.2; i <= 1.2; i += 0.08) {
      wavePoints.push(new THREE.Vector3(i, 0.08, Math.sin(i * 6) * 0.3));
    }
    waveGeom.setFromPoints(wavePoints);
    const waveLine = new THREE.Line(waveGeom, new THREE.LineBasicMaterial({ color: 0x3dd6c4 }));
    sensorLayer.add(waveLine);
    sensorLayer.position.y = -0.1;
    pipelineRoot.add(sensorLayer);

    // 3. BiLSTM Autoencoder Neural Block
    const neuralLayer = new THREE.Group();
    const neuralCore = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.2, 1.3), neuralMat);
    neuralLayer.add(neuralCore);

    // Internal node lattice
    const nodeGeom = new THREE.SphereGeometry(0.04, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x3dd6c4 });
    for (let x = -0.9; x <= 0.9; x += 0.45) {
      for (let z = -0.4; z <= 0.4; z += 0.4) {
        const node = new THREE.Mesh(nodeGeom, nodeMat);
        node.position.set(x, 0.15, z);
        neuralLayer.add(node);
      }
    }
    neuralLayer.position.y = 0.1;
    pipelineRoot.add(neuralLayer);

    // 4. Isolation Forest Layer
    const anomalyLayer = new THREE.Group();
    const anomalyPlates = createChassisLayer(2.6, 0.12, 1.4, sensorMat);
    anomalyLayer.add(anomalyPlates);
    anomalyLayer.position.y = 0.3;
    pipelineRoot.add(anomalyLayer);

    // 5. Top Shell
    const topChassis = createChassisLayer(3.2, 0.2, 1.8, chassisMat);
    topChassis.position.y = 0.5;
    pipelineRoot.add(topChassis);

    // 6. Central Decision Node (Hidden at start, glows at final stage)
    const decisionCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.35, 0), coreGlowMat);
    decisionCore.position.set(0, 0, 0);
    decisionCore.scale.set(0.01, 0.01, 0.01);
    pipelineRoot.add(decisionCore);

    // ── Continuous subtle idle spin (active during scrub) ──
    let reqId;
    const clock = new THREE.Clock();

    const animateScene = () => {
      const elapsed = clock.getElapsedTime();
      decisionCore.rotation.y = elapsed * 1.5;
      decisionCore.rotation.x = elapsed * 0.8;
      renderer.render(scene, camera);
      reqId = requestAnimationFrame(animateScene);
    };
    animateScene();

    // ── GSAP Scroll-Scrubbed Timeline ──
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=2800',
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

    // Stage 0 -> Stage 1: Explode starts (Device Shell separates, revealing Sensor layer)
    masterTl
      .to(pipelineRoot.rotation, { y: 0.6, x: 0.25, duration: 2, ease: 'none' }, 0)
      .to(topChassis.position, { y: 1.8, duration: 2, ease: 'power1.out' }, 0)
      .to(bottomChassis.position, { y: -1.8, duration: 2, ease: 'power1.out' }, 0)
      .to(sensorLayer.position, { y: -0.9, duration: 2, ease: 'power1.out' }, 0)
      .to(anomalyLayer.position, { y: 1.0, duration: 2, ease: 'power1.out' }, 0)
      .to(neuralLayer.position, { y: 0.1, duration: 2, ease: 'power1.out' }, 0)
      .to(camera.position, { z: 6.8, y: 1.0, duration: 2 }, 0);

    // Stage 1 -> Stage 2: Camera shifts to focus on Neural BiLSTM block
    masterTl
      .to(pipelineRoot.rotation, { y: -0.4, x: 0.35, duration: 2, ease: 'none' }, 2)
      .to(sensorLayer.position, { y: -1.4, duration: 2 }, 2)
      .to(anomalyLayer.position, { y: 1.4, duration: 2 }, 2)
      .to(neuralLayer.scale, { x: 1.15, y: 1.15, z: 1.15, duration: 2 }, 2)
      .to(signalLight, { intensity: 4.5, duration: 2 }, 2);

    // Stage 2 -> Stage 3: Isolation Forest anomaly layer highlight
    masterTl
      .to(pipelineRoot.rotation, { y: 0.8, x: 0.15, duration: 2, ease: 'none' }, 4)
      .to(anomalyLayer.position, { y: 0.7, duration: 2 }, 4)
      .to(neuralLayer.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 2 }, 4)
      .to(anomalyLayer.scale, { x: 1.15, y: 1.15, z: 1.15, duration: 2 }, 4);

    // Stage 3 -> Stage 4: Convergence into high-intensity Decision Node
    masterTl
      .to(pipelineRoot.rotation, { y: 0, x: 0.1, duration: 2, ease: 'power2.inOut' }, 6)
      .to(topChassis.position, { y: 0.4, duration: 2, ease: 'power2.inOut' }, 6)
      .to(bottomChassis.position, { y: -0.4, duration: 2, ease: 'power2.inOut' }, 6)
      .to(sensorLayer.position, { y: -0.15, duration: 2, ease: 'power2.inOut' }, 6)
      .to(anomalyLayer.position, { y: 0.15, duration: 2, ease: 'power2.inOut' }, 6)
      .to(anomalyLayer.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 2 }, 6)
      .to(decisionCore.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 2, ease: 'back.out(2)' }, 6)
      .to(signalLight, { intensity: 6, duration: 2 }, 6)
      .to(camera.position, { z: 6.2, duration: 2 }, 6);

    // Resize handler
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
      cancelAnimationFrame(reqId);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      renderer.dispose();
    };
  }, []);

  if (isReducedMotion) {
    return (
      <section className="py-24 px-6 border-t border-surface-border">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="font-mono text-xs text-signal tracking-widest uppercase block mb-2">
              System Architecture
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
              How GuardianSense Decides
            </h2>
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

  const currentStage = stages[activeStage] || stages[0];
  const CurrentIcon = currentStage.icon;

  return (
    <section id="architecture" ref={sectionRef} className="relative w-full bg-bg border-t border-surface-border">
      <div
        ref={containerRef}
        className="w-full h-screen relative flex items-center justify-center overflow-hidden"
      >
        {/* 3D WebGL Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-0" />

        {/* Section Header Pin */}
        <div className="absolute top-20 left-6 sm:left-12 z-20 pointer-events-none">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-signal inline-block" />
            <span className="font-mono text-xs text-signal uppercase tracking-widest">
              Live Pipeline Deconstruction
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            How GuardianSense Decides
          </h2>
          <p className="font-mono text-xs text-ink-dim mt-1">
            Scroll to scrub through real-time on-device inference stages
          </p>
        </div>

        {/* Dynamic Scrubbed Stage Callout Card (Pinned overlay) */}
        <div className="absolute bottom-12 sm:bottom-16 left-6 right-6 sm:left-auto sm:right-12 sm:max-w-md z-20">
          <div className="card-surface p-6 backdrop-blur-md bg-surface/90 border-signal/30 shadow-2xl">
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
              <div className="flex items-center gap-2">
                <CurrentIcon className="w-4 h-4 text-signal" />
                <span className="font-mono text-xs font-bold text-signal tracking-widest uppercase">
                  Stage {currentStage.step} — {currentStage.tag}
                </span>
              </div>
            </div>

            <h3 className="font-display text-lg sm:text-xl font-bold text-ink mb-2">
              {currentStage.title}
            </h3>

            <p className="text-sm text-ink-dim leading-relaxed mb-4">
              {currentStage.desc}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-surface-border text-xs font-mono text-ink-dim">
              <span>BiLSTM + Isolation Forest Pipeline</span>
              <span className="text-signal">&lt;800ms Edge Latency</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator Prompt */}
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 font-mono text-xs text-ink-dim transition-opacity duration-300 ${
            activeStage === 0 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span>Scroll to explode</span>
          <ChevronDown className="w-3.5 h-3.5 text-signal animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSequence;
