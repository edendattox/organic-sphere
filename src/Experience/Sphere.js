import * as THREE from "three";
import Experience from "./Experience";
import vertexShader from "./shaders/sphere/vertex.glsl";
import fragmentShader from "./shaders/sphere/fragment.glsl";

export default class Sphere {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    this.timeFrequency = 0.0001;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: "portal",
        expanded: true,
      });
      this.debugFolder.addInput(this, "timeFrequency", {
        min: 0,
        max: 0.001,
        step: 0.000001,
      });
    }

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(1, 512, 512);
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uDistortionFrequency: { value: 2.0 },
        uDistortionStrength: { value: 1.0 },
        uDisplacementFrequency: { value: 2.0 },
        uDisplacementStrength: { value: 0.2 },
        uTimeFrequency: { value: 0.0001 },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    if (this.debug) {
      this.debugFolder.addInput(
        this.material.uniforms.uDistortionFrequency,
        "value",
        { label: "uDistortionFrequency", min: 0, max: 10, stop: 0.001 }
      );
      this.debugFolder.addInput(
        this.material.uniforms.uDisplacementFrequency,
        "value",
        { label: "uDisplacementFrequency", min: 0, max: 10, stop: 0.001 }
      );
      this.debugFolder.addInput(
        this.material.uniforms.uDistortionStrength,
        "value",
        { label: "uDistortionStrength", min: 0, max: 5, stop: 0.001 }
      );
      this.debugFolder.addInput(
        this.material.uniforms.uDisplacementStrength,
        "value",
        { label: "uDisplacementStrength", min: 0, max: 1, stop: 0.001 }
      );
      this.debugFolder.addInput(
        this.material.uniforms.uTimeFrequency,
        "value",
        { label: "uTimeFrequency", min: 0, max: 0.1, stop: 0.0001 }
      );
    }
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  update() {
    this.material.uniforms.uTime.value += this.time.delta * this.timeFrequency;
  }
}
