import { ImageResponse } from 'next/og'
import { projects } from '@/data/projects'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
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
              backgroundImage: 'linear-gradient(45deg, #1e293b 0%, #334155 100%)',
            }}
          >
            <div
              style={{
                fontSize: 60,
                fontWeight: 'bold',
                color: 'white',
                marginBottom: 20,
              }}
            >
              NRG Portfolio
            </div>
            <div
              style={{
                fontSize: 24,
                color: '#94a3b8',
              }}
            >
              Modern Web Development
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      )
    }

    const project = projects.find((p) => p.slug === slug)

    if (!project) {
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
            }}
          >
            <div
              style={{
                fontSize: 60,
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              Project Not Found
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      )
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#0f172a',
            backgroundImage: `linear-gradient(135deg, ${project.highlightColor || '#3b82f6'}20 0%, #1e293b 100%)`,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '40px 60px',
              borderBottom: '1px solid #334155',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: project.highlightColor || '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
              >
                NRG
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: 'white',
                }}
              >
                Portfolio
              </div>
            </div>
            <div
              style={{
                fontSize: 18,
                color: '#94a3b8',
              }}
            >
              {project.year}
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '60px',
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontWeight: 'bold',
                color: 'white',
                marginBottom: 24,
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </div>
            
            <div
              style={{
                fontSize: 24,
                color: '#94a3b8',
                marginBottom: 32,
                lineHeight: 1.4,
              }}
            >
              {project.shortDescription}
            </div>

            {/* Tags */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                marginBottom: 32,
              }}
            >
              {project.tags.slice(0, 4).map((tag, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: project.highlightColor || '#3b82f6',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: 20,
                    fontSize: 16,
                    fontWeight: '500',
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>

            {/* Metrics */}
            {project.metrics && (
              <div
                style={{
                  display: 'flex',
                  gap: 32,
                  fontSize: 18,
                  color: '#94a3b8',
                }}
              >
                {project.metrics.users && (
                  <div>👥 {project.metrics.users}</div>
                )}
                {project.metrics.stars && (
                  <div>⭐ {project.metrics.stars}</div>
                )}
                {project.metrics.lighthousePerf && (
                  <div>⚡ {project.metrics.lighthousePerf}</div>
                )}
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}















