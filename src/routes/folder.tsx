import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/folder')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/folder"!</div>
}
