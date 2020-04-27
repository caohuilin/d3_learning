function handleDocumentReady() {
  demo1()
  demo2()
  demo3()
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
  const height = 200

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
    .attr('y', (_d, index) => index * rectHeight)
    .attr('width', (d) => linear(d))
    .attr('height', rectHeight - 2)
    .attr('fill', 'steelblue')

  // 坐标轴
  const axis = d3.svg
    .axis()
    .scale(linear) //指定比例尺
    .orient('bottom') //指定刻度的方向
    .ticks(7) //指定刻度的数量
  svg
    .append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(20,130)')
    .call(axis)
}

// 完整柱状图
function demo3() {
  const width = 400
  const height = 400

  const svg = d3
    .select('.demo3')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
  const padding = { left: 30, right: 30, top: 20, bottom: 20 }

  const dataset = [10, 20, 30, 40, 33, 24, 12, 5]

  // x轴的比例尺
  const xScale = d3.scale
    .ordinal()
    .domain(d3.range(dataset.length))
    .rangeRoundBands([0, width - padding.left - padding.right])

  // y轴的比例尺
  const yScale = d3.scale
    .linear()
    .domain([0, d3.max(dataset)])
    .range([height - padding.top - padding.bottom, 0])

  //定义x轴
  const xAxis = d3.svg.axis().scale(xScale).orient('bottom')

  //定义y轴
  const yAxis = d3.svg.axis().scale(yScale).orient('left')

  //矩形之间的空白
  const rectPadding = 4

  //添加矩形元素
  svg
    .selectAll('.MyRect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class', 'MyRect')
    .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
    .attr('x', (_d, i) => {
      return xScale(i) + rectPadding / 2
    })
    .attr('y', (d) => {
      return yScale(d)
    })
    .attr('width', xScale.rangeBand() - rectPadding)
    .attr('height', (d) => {
      return height - padding.top - padding.bottom - yScale(d)
    })
    .attr('fill', 'steelblue')

  //添加文字元素
  svg
    .selectAll('.MyText')
    .data(dataset)
    .enter()
    .append('text')
    .attr('class', 'MyText')
    .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
    .attr('x', (_d, i) => {
      return xScale(i) + rectPadding / 2
    })
    .attr('y', (d) => {
      return yScale(d)
    })
    .attr('dx', () => {
      return (xScale.rangeBand() - rectPadding) / 2
    })
    .attr('dy', () => {
      return 20
    })
    .text((d) => {
      return d
    })
    .attr('y', () => {
      const min = yScale.domain()[0]
      return yScale(min)
    })
    .transition()
    .delay((_d, i) => {
      return i * 200
    })
    .duration(1000)
    .ease('linear')
    .attr('y', (d) => {
      return yScale(d)
    })

  //   添加x轴
  svg
    .append('g')
    .attr('class', 'axis')
    .attr(
      'transform',
      'translate(' + padding.left + ',' + (height - padding.bottom) + ')'
    )
    .call(xAxis)

  //添加y轴
  svg
    .append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
    .call(yAxis)
}
