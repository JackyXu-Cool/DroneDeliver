import React, { Suspense } from "react";
import classes from "./SensorPlacementInfo.module.scss";
import { Canvas } from "react-three-fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Skeleton from "../Skeleton/Skeleton";

const SensorPlacementInfo = (props) => {
  let orbitControl = null;

  if (props.orbitControl) {
    orbitControl = <OrbitControls maxDistance={3} minDistance={1.4} />;
  }

  return (
    <div className={classes.sensorPlacementInfo}>
      <div className={classes.message}>
        <h2 className={classes.title}>Place virtual sensors on human body</h2>
        <p className={classes.sensorPlacementMessage}>
          create and drag sensors to expected positions on the body
        </p>
      </div>
      <div className={classes.sensorPlacementMain}>
        <Canvas
          concurrent
          invalidateFrameloop
          shadowMap
          raycaster
          //camera={{ position: [0, 0, 1.5] }}
          resize={{ scroll: false }}
          camera={{ position: [0, 0, 1.5] }}
        >
          {/* <OrbitControls maxDistance={3} minDistance={1.4} /> */}
          {orbitControl}
          <ambientLight intensity={0.5} />
          <pointLight color="lightblue" />
          <pointLight position={[10, 10, -10]} color="lightblue" />
          <pointLight position={[-10, -10, 10]} color="lightblue" />
          <Suspense fallback={null}>
            <Skeleton raycaster />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default SensorPlacementInfo;
