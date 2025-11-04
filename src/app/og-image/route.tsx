import { ImageResponse } from 'next/og'

export const runtime = 'edge'

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
          backgroundColor: '#0f172a',
          backgroundImage: 'linear-gradient(45deg, #0f172a 0%, #1e293b 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '20px',
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              NRG
            </div>
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              Portfolio
            </div>
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '10px',
            }}
          >
            Nikolay Goranov
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '32px',
              color: '#3b82f6',
              marginBottom: '30px',
            }}
          >
            Full-Stack Developer
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: '24px',
              color: '#94a3b8',
              maxWidth: '800px',
              lineHeight: '1.4',
              marginBottom: '40px',
            }}
          >
            Crafting exceptional digital experiences with modern technologies
          </div>

          {/* Tech Stack */}
          <div
            style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Node.js'].map((tech) => (
              <div
                key={tech}
                style={{
                  backgroundColor: '#1e293b',
                  color: '#3b82f6',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '18px',
                  fontWeight: '500',
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}









