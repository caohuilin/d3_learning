function handleDocumentReady() {
  demo1()
  demo2()
}
// 简易柱状图
function demo1() {
  const width = 300
  const height = 300

  // 添加画布
  const svg = d3
    .select('.demo1')
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
    .attr('width', (d) => d)
    .attr('height', rectHeight - 2)
    .attr('fill', 'steelblue')
}

// 带比例尺
function demo2() {
  const width = 300
  const height = 300

  // 添加画布
  const svg = d3
    .select('.demo2')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  // 绘制矩形
  const dataset = [1.2, 2.3, 0.9, 1.5, 3.3]
  const min = d3.min(dataset)
  const max = d3.max(dataset)

  const linear = d3.scale.linear().domain([min, max]).range([0, 300])
  const rectHeight = 25 // 每个矩形像素高度
  svg
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', 20)
    .attr('y', (_d, index) => index * (rectHeight + 5))
    .attr('width', (d) => linear(d))
    .attr('height', rectHeight - 2)
    .attr('fill', 'steelblue')
}
