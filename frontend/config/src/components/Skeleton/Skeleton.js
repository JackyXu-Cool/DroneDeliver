import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import { useThree, useFrame } from "react-three-fiber";
import { useDrag } from "react-use-gesture";
import { useGLTF, useFBX, useAnimations } from "@react-three/drei";

const Skeleton = (props) => {
  console.log(props.camera);
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("../../../Xbot.glb");
  const fbx = useFBX("../../../xbot.fbx").children[0];
  console.log("glb: ", useGLTF("../../../Xbot.glb"));
  const ray = useThree(new THREE.Raycaster());
  console.log(ray);

  materials.Beta_Joints_MAT.color = {
    b: 1,
    g: 1,
    r: 1,
  };

  materials["asdf1:Beta_HighLimbsGeoSG2"].color = {
    b: 0.5,
    g: 0.5,
    r: 0.5,
  };

  return (
    // <mesh ref={group} {...props} dispose={null} position={[0, -0.9, 0]}>
    //   <mesh scale={[0.01, 0.01, 0.01]}>
    //     <primitive object={nodes.mixamorigHips} />
    //     <skinnedMesh
    //       material={materials.Beta_Joints_MAT}
    //       geometry={nodes.Beta_Joints.geometry}
    //       skeleton={nodes.Beta_Joints.skeleton}
    //     />
    //     <skinnedMesh
    //       material={materials["asdf1:Beta_HighLimbsGeoSG2"]}
    //       geometry={nodes.Beta_Surface.geometry}
    //       skeleton={nodes.Beta_Surface.skeleton}
    //     />
    //     <mesh
    //       material={fbx.material}
    //       geometry={fbx.geometry}
    //       onClick={(e) => {
    //         console.log("here");
    //       }}
    //     />
    //   </mesh>
    // </mesh>

    <mesh
      material={fbx.material}
      geometry={fbx.geometry}
      onClick={(e) => {
        console.log(ray.intersect);
      }}
    />
  );
};

export default Skeleton;

//useGLTF.preload("../../../Xbot.glb");
