import type { LoadEvent } from '@sveltejs/kit'
export async function load({ fetch }: LoadEvent) {
  const res = await fetch('/guide.json')

  const props = await res.json()
  throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
  return {
    status: res.status,
    props,
  }
}
