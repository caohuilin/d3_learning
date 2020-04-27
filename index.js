function handleDocumentReady() {
  const width = 300
  const height = 300

  // 添加画布
  const svg = d3
    .select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  // 绘制矩形
  const dataset = [250, 210, 170, 130, 90] // 可视化数据
  const rectHeight = 25 // 每个矩形像素高度
  svg
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', 20)
    .attr('y', (d) => d)
    .attr('width', function (d) {
      return d
    })
    .attr('height', rectHeight - 2)
    .attr('fill', 'steelblue')
}
