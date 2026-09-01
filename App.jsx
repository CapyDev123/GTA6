import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import './App.css';

// Componente do Jogador
function Player({ position, setPosition }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const speed = 0.5;
      if (e.key === 'w') setPosition((p) => [p[0], p[1], p[2] - speed]);
      if (e.key === 's') setPosition((p) => [p[0], p[1], p[2] + speed]);
      if (e.key === 'a') setPosition((p) => [p[0] - speed, p[1], p[2]]);
      if (e.key === 'd') setPosition((p) => [p[0] + speed, p[1], p[2]]);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setPosition]);

  return (
    <mesh position={position}>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color="crimson" />
    </mesh>
  );
}

export default function App() {
  const [playerPosition, setPlayerPosition] = useState([0, 1, 0]);

  // Função para salvar posição no Backend (PHP)
  const saveProgress = async () => {
    await fetch('http://localhost/api/save.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ x: playerPosition[0], y: playerPosition[1], z: playerPosition[2] }),
    });
    alert('Progresso salvo!');
  };

  return (
    <div className="game-container">
      {/* Interface em CSS sobreposta ao jogo */}
      <div className="hud">
        <h2>Mini GTA 3D</h2>
        <button onClick={saveProgress}>Salvar Posição</button>
      </div>

      {/* Renderizador 3D com React Three Fiber */}
      <Canvas camera={{ position: [playerPosition[0], playerPosition[1] + 4, playerPosition[2] + 6] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        
        {/* Chão */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="forestgreen" />
        </mesh>

        {/* Personagem */}
        <Player position={playerPosition} setPosition={setPlayerPosition} />
      </Canvas>
    </div>
  );
}
