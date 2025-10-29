export function AutoplayPlugin(interval: number) {
  return (slider: any) => {
    let timeout: NodeJS.Timeout
    let mouseOver = false

    function clearNextTimeout() {
      clearTimeout(timeout)
    }

    function nextTimeout() {
      clearTimeout(timeout)
      if (mouseOver) return
      timeout = setTimeout(() => {
        slider.next()
      }, interval)
    }

    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true
        clearNextTimeout()
      })
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false
        nextTimeout()
      })
      nextTimeout()
    })

    slider.on("dragStarted", clearNextTimeout)
    slider.on("animationEnded", nextTimeout)
    slider.on("updated", nextTimeout)
  }
}
