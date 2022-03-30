/**
 *  获取所有的在某节点之后的兄弟节点
 * @param node 目标DOM节点
 * @returns
 */
const getPrevSiblings = (node: HTMLElement) => {
  const prevSiblings: HTMLElement[] = []
  let prev: HTMLElement | null = node.previousElementSibling as HTMLElement
  while (prev) {
    prevSiblings.push(prev)
    prev = prev.previousElementSibling as HTMLElement
  }
  return prevSiblings
}

/**
 * 获取所有的在某节点之前的兄弟节点
 * @param node 目标DOM节点
 * @returns
 */
const getNextSiblings = (node: HTMLElement) => {
  const nextSiblings: HTMLElement[] = []
  let next: HTMLElement | null = node.nextElementSibling as HTMLElement
  while (next) {
    nextSiblings.push(next)
    next = next.nextElementSibling as HTMLElement
  }
  return nextSiblings
}

/**
 * 清除某个节点的过渡状态
 * @param node 目标DOM节点
 */
const removeTransitionStatus = (node: HTMLElement) => {
  node.style.position = 'static'
  node.style.transform = ''
  node.classList.remove('c-notification--with-transition')
}

/**
 * 清除所有兄弟节点的过渡状态
 * @param node 目标DOM节点
 */
const clearSiblingsTransition = (node: HTMLElement) => {
  const nextSiblings = getNextSiblings(node)
  const prevSiblings = getPrevSiblings(node)
  prevSiblings.forEach(removeTransitionStatus)
  nextSiblings.forEach(removeTransitionStatus)
  removeTransitionStatus(node)
}

export { getNextSiblings, getPrevSiblings, clearSiblingsTransition }
