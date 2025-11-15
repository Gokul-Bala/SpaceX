"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { solarSystemData, SUN_DATA, type CelestialData } from '@/lib/solar-system-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type SceneProps = {
  onLoadProgress: (progress: number) => void;
  onLoaded: () => void;
  onPlanetClick: (planet: CelestialData | null) => void;
  showOrbits: boolean;
  showLabels: boolean;
  timeScale: number;
  isPaused: boolean;
  autoRotate: boolean;
};

// Scaling factors for visual appeal
const RADIUS_SCALE_LOG = 2.5;
const SUN_RADIUS_SCALE = 0.00008;
const DISTANCE_SCALE = 0.4;

export function SceneComponent({
  onLoadProgress, onLoaded, onPlanetClick,
  showOrbits, showLabels, timeScale, isPaused, autoRotate,
}: SceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneElementsRef = useRef<any>({});
  const animationPropsRef = useRef({ timeScale, isPaused, autoRotate });
  const isSceneInitialized = useRef(false);

  useEffect(() => {
    animationPropsRef.current = { timeScale, isPaused, autoRotate };
  }, [timeScale, isPaused, autoRotate]);

  useEffect(() => {
    const { planets } = sceneElementsRef.current;
    if (planets) {
      planets.forEach((p: any) => p.orbit.visible = showOrbits);
    }
  }, [showOrbits]);

  useEffect(() => {
    const { planets } = sceneElementsRef.current;
    if (planets) {
      planets.forEach((p: any) => p.label.visible = showLabels);
    }
  }, [showLabels]);

  useEffect(() => {
    if (isSceneInitialized.current || !mountRef.current) return;
    
    const mountNode = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mountNode.clientWidth / mountNode.clientHeight, 0.1, 5000);
    camera.position.set(0, 150, 400);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountNode.appendChild(renderer.domElement);

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none';
    mountNode.appendChild(labelRenderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 20;
    controls.maxDistance = 1500;

    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(mountNode.clientWidth, mountNode.clientHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0;
    bloomPass.strength = 1.2; // Reduced bloom strength
    bloomPass.radius = 0;
    const composer = new EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(bloomPass);

    const loadingManager = new THREE.LoadingManager(onLoaded, (url, loaded, total) => {
      onLoadProgress((loaded / total) * 100);
    });
    const textureLoader = new THREE.TextureLoader(loadingManager);

    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 20000; i++) {
        const x = THREE.MathUtils.randFloatSpread(4000);
        const y = THREE.MathUtils.randFloatSpread(4000);
        const z = THREE.MathUtils.randFloatSpread(4000);
        starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xffffff, size: 0.2 }));
    scene.add(stars);

    const sunTexture = textureLoader.load(PlaceHolderImages.find(p => p.id === SUN_DATA.textureId)?.imageUrl || '');
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(SUN_DATA.radius * SUN_RADIUS_SCALE, 64, 64),
      new THREE.MeshBasicMaterial({ map: sunTexture, toneMapped: false })
    );
    sun.userData = SUN_DATA;
    scene.add(sun);
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));
    const pointLight = new THREE.PointLight(0xffffff, 3.5, 4000);
    sun.add(pointLight);

    const planets: any[] = [];
    const planetMeshes: THREE.Object3D[] = [sun];

    solarSystemData.forEach(data => {
      const texture = textureLoader.load(PlaceHolderImages.find(p => p.id === data.textureId)?.imageUrl || '');
      const material = new THREE.MeshStandardMaterial({ map: texture });
      const scaledRadius = Math.log(data.radius) * RADIUS_SCALE_LOG;
      const planet = new THREE.Mesh(new THREE.SphereGeometry(scaledRadius, 32, 32), material);
      planet.userData = data;

      if (data.ringTextureId) {
        const ringTexture = textureLoader.load(PlaceHolderImages.find(p => p.id === data.ringTextureId)?.imageUrl || '');
        ringTexture.rotation = Math.PI / 2;
        const ringMaterial = new THREE.MeshBasicMaterial({
          map: ringTexture, side: THREE.DoubleSide, transparent: true, opacity: 0.8
        });
        const ringGeometry = new THREE.RingGeometry(scaledRadius * 1.5, scaledRadius * 2.5, 64);
        const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
        ringMesh.rotation.x = -Math.PI / 2;
        planet.add(ringMesh);
      }

      const scaledDistance = data.distance! * DISTANCE_SCALE;
      const orbit = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(new THREE.Path().absellipse(0, 0, scaledDistance, scaledDistance, 0, 2 * Math.PI, false, 0).getSpacedPoints(256)),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 })
      );
      orbit.rotation.x = -Math.PI / 2;
      orbit.visible = showOrbits;
      scene.add(orbit);

      const labelDiv = document.createElement('div');
      labelDiv.className = 'text-white text-xs bg-black/30 px-1 rounded-sm';
      labelDiv.textContent = data.name;
      const label = new CSS2DObject(labelDiv);
      label.position.set(0, scaledRadius + 2, 0);
      label.visible = showLabels;
      planet.add(label);

      const planetGroup = new THREE.Object3D();
      planetGroup.add(planet);
      scene.add(planetGroup);

      planets.push({ body: planetGroup, planetMesh: planet, data, orbit, label });
      planetMeshes.push(planet);
    });
    sceneElementsRef.current = { planets, planetMeshes, controls };

    const clock = new THREE.Clock();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const { timeScale, isPaused, autoRotate } = animationPropsRef.current;
      const elapsedTime = clock.getElapsedTime();

      controls.autoRotate = autoRotate;
      controls.update();

      if (!isPaused) {
        sun.rotation.y += 0.0005 * timeScale;
        planets.forEach(({ body, planetMesh, data }) => {
          const scaledDistance = data.distance! * DISTANCE_SCALE;
          const orbitalSpeed = 0.5 / Math.sqrt(data.orbitalPeriod!);
          const rotationSpeed = 20 / data.rotationPeriod!;
          
          body.position.x = Math.sin(elapsedTime * orbitalSpeed * timeScale) * scaledDistance;
          body.position.z = Math.cos(elapsedTime * orbitalSpeed * timeScale) * scaledDistance;
          planetMesh.rotation.y += rotationSpeed * timeScale * 0.1;
        });
      }
      composer.render();
      labelRenderer.render(scene, camera);
    };

    const onMouseClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement) !== renderer.domElement) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planetMeshes);
      if (intersects.length > 0) {
        onPlanetClick(intersects[0].object.userData as CelestialData);
      } else {
        onPlanetClick(null); // Clicked on empty space
      }
    };

    const handleResize = () => {
      camera.aspect = mountNode.clientWidth / mountNode.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
      labelRenderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
      composer.setSize(mountNode.clientWidth, mountNode.clientHeight);
    };

    mountNode.addEventListener('click', onMouseClick);
    window.addEventListener('resize', handleResize);
    animate();
    
    isSceneInitialized.current = true;

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      mountNode.removeEventListener('click', onMouseClick);
      
      mountNode.removeChild(renderer.domElement);
      mountNode.removeChild(labelRenderer.domElement);
      
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach(material => {
            if (material.map) material.map.dispose();
            material.dispose();
          });
        }
      });
      renderer.dispose();
      isSceneInitialized.current = false;
    };
  }, [onLoadProgress, onLoaded, onPlanetClick]); // Keep dependencies to run once

  return <div ref={mountRef} className="w-full h-full" />;
}

    