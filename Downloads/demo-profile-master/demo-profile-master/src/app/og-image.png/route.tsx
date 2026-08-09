import { ImageResponse } from 'next/og';
import { personalInfo } from '@/data/resume-data';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#030014', // Cyberpunk bg
          backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #030014 100%)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1
            style={{
              fontSize: 80,
              color: 'white',
              fontWeight: 800,
              margin: 0,
              letterSpacing: '-0.05em',
            }}
          >
            {personalInfo.name}
          </h1>
          <p
            style={{
              fontSize: 40,
              color: '#00d4ff', // Cyan
              marginTop: 20,
              fontWeight: 600,
            }}
          >
            {personalInfo.title}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
