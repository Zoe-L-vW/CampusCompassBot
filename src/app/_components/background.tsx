export function BackgroundGrid() {
    return <div className="absolute inset-0 [background-size:10px_10px] [background-image:linear-gradient(to_right,var(--background-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--background-grid)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-[-1]" />
}

export function DotGridBackground() {
  return (
    <div className="fixed inset-0 -z-10 
      [background-size:40px_40px] 
      [background-image:radial-gradient(circle,rgba(200,200,255,0.2)_1px,transparent_1px)]"
    />
  )
}

export function DiagonalStripeBackground() {
  return (
    <div className="fixed inset-0 -z-10 
      [background-size:20px_20px] 
      [background-image:repeating-linear-gradient(45deg,#f0f0ff_0,#f0f0ff_1px,transparent_1px,transparent_10px)]"
    />
  )
}

export function GradientMeshBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 
        [background:radial-gradient(circle_at_center,var(--background-grid)_0,transparent_50%)] 
        [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      />
    </div>
  )
}

export function MinimalLineGrid() {
  return (
    <div className="fixed inset-0 -z-10 
      [background-size:24px_24px] 
      [background-image:linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)]
      [mask-image:linear-gradient(to_bottom,transparent_5%,white_20%,white_80%,transparent_95%)]"
    />
  )
}

export function DynamicGradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 
      bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
    />
  )
}