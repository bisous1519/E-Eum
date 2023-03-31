import React, { useRef, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import useDimension from '../../hooks/useDimension';
import useNav from '../../hooks/useNav';
import * as THREE from 'three';
import { Asset } from 'expo-asset';
import { GLView } from 'expo-gl';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const styles = StyleSheet.create({
  threeBox: {
    width: 300,
    height: 300,
    backgroundColor: 'red',
    borderRadius: 10,
  },
});

const xhr = new XMLHttpRequest();

const loader = new GLTFLoader();
const scene = new THREE.Scene();
// const dataPath = '../../assets/animation/noCamera.glb';
// loader.load(
//   dataPath,
//   function (gltf) {
//     scene.add(gltf.scene);
//   },
//   undefined,
//   function (error) {
//     console.log('3D 렌더 에러');
//     console.error(error);
//   }
// );

export default function MessagePaper(): JSX.Element {
  const navigation = useNav();

  const backToList = () => {
    navigation.push('BottleBlue');
  };

  const on3DContextCreate = () => {
    const camera = new THREE.PerspectiveCamera(39.6, 1080 / 1920, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(DEVICE_WIDTH, DEVICE_HEIGHT);
    document.body.appendChild(renderer.domElement);
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  };

  return (
    <View>
      <Pressable onPress={backToList}>
        <Text>Back</Text>
      </Pressable>
      <View style={styles.threeBox}>
        <GLView onContextCreate={on3DContextCreate}></GLView>
      </View>
    </View>
  );
}
