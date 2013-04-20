// Generated by CoffeeScript 1.6.1
(function() {
  var Chart, addTimeToData, animation_delay, color, createChart, create_XY_data, height, margin, processJson, showOnly, svg, width;

  color = d3.scale.category10();

  animation_delay = 2000;

  showOnly = function(chart, b) {
    chart.xScale.domain(b);
    chart.chartContainer.selectAll("rect").data(chart.chartData).attr("x", function(d) {
      return chart.xScale(d.domX[0]) + .5;
    }).attr("width", function(d) {
      return chart.xScale(d.domX[1]) - chart.xScale(d.domX[0]) - .5;
    });
    chart.chartContainer.selectAll("line").data(chart.chartData).attr("x1", function(d) {
      return chart.xScale(d.domX[0]) + .5;
    }).attr("x2", function(d) {
      return chart.xScale(d.domX[0]) + .5;
    });
    chart.chartContainer.selectAll("path.chart").attr("d", chart.area);
    chart.chartContainer.selectAll("path.line").attr("d", chart.line);
    chart.chartContainer.select(".x.axis.top").call(chart.xAxisTop);
    return chart.chartContainer.select(".x.axis.bottom").call(chart.xAxisBottom);
  };

  addTimeToData = function(t, item) {
    item.values = item.values.map(function(data) {
      var ret;
      ret = {};
      ret.time = [+data.time[0] + t[1], +data.time[1] + t[1]];
      ret.enclosure = data.enclosure;
      return ret;
    });
    return item;
  };

  create_XY_data = function(data, key0, key1) {
    var data_0, data_1, t1, t2;
    data_0 = data[key0];
    data_1 = data[key1];
    t1 = _.map(_.zip(data_0, data_1), function(d) {
      return _.zip(d[0].values, d[1].values);
    });
    t2 = _.map(t1, function(piece, i) {
      var ret;
      ret = _.map(piece, function(d) {
        ret = {};
        ret[key0] = d[0].enclosure;
        ret[key1] = d[1].enclosure;
        return ret;
      });
      ret.mode = i;
      return ret;
    });
    t2.key0 = key0;
    t2.key1 = key1;
    return t2;
  };

  processJson = function(json) {
    var groups, result, result2, traces;
    groups = json.groups;
    json.traces = _.rest(json.traces);
    traces = _.filter(json.traces, function(item) {
      return _.some(groups, function(g) {
        return (+item[0].group) === g;
      });
    });
    result = [];
    traces.forEach(function(trace) {
      return trace.forEach(function(piece) {
        var k, key_strings, s;
        key_strings = piece.key.split("_");
        piece.mode = _.last(key_strings);
        key_strings = _.initial(key_strings);
        s = piece.step = _.last(key_strings);
        key_strings = _.initial(key_strings);
        k = piece.key = key_strings.join("_");
        if (!(k in result)) {
          result[k] = new Array();
        }
        if (!(s in result[k])) {
          result[k][s] = new Array();
        }
        result[k][s] = piece;
        return result[k].key = k;
      });
    });
    result2 = create_XY_data(result, "x", "v");
    return result2;
  };

  createChart = function(json) {
    var chart, chartHeight, data;
    data = processJson(json);
    data.dom0 = [
      d3.min(data, function(piece) {
        return d3.min(piece, function(d) {
          return d[data.key0][0];
        });
      }), d3.max(data, function(piece) {
        return d3.max(piece, function(d) {
          return d[data.key0][1];
        });
      })
    ];
    data.dom1 = [
      d3.min(data, function(piece) {
        return d3.min(piece, function(d) {
          return d[data.key1][0];
        });
      }), d3.max(data, function(piece) {
        return d3.max(piece, function(d) {
          return d[data.key1][1];
        });
      })
    ];
    chartHeight = height;
    return chart = new Chart({
      data: data,
      id: 0,
      width: width,
      height: height,
      svg: svg,
      margin: margin
    });
  };

  Chart = (function() {

    function Chart(data) {
      var chart, chartContainer, key0, key1, xS, yS;
      this.chartData = data.data;
      this.width = data.width;
      this.height = data.height;
      this.dom0 = this.chartData.dom0;
      this.svg = data.svg;
      this.id = data.id;
      this.margin = data.margin;
      this.xScale = d3.scale.linear().range([0, this.width]).domain(this.chartData.dom0);
      this.yScale = d3.scale.linear().range([this.height, 0]).domain(this.chartData.dom1);
      xS = this.xScale;
      yS = this.yScale;
      chart = this;
      key0 = data.data.key0;
      key1 = data.data.key1;
      this.line = d3.svg.line().interpolate("basis").x(function(p) {
        return xS((p[key0][0] + p[key0][1]) / 2);
      }).y(function(p) {
        return yS((p[key1][0] + p[key1][1]) / 2);
      });
      this.area = d3.svg.area().interpolate("basis").x0(function(p) {
        return xS(p[key0][0]);
      }).x1(function(p) {
        return xS(p[key0][1]);
      }).y0(function(p) {
        return yS(p[key1][0]);
      }).y1(function(p) {
        return yS(p[key1][1]);
      });
      chartContainer = this.chartContainer = svg.append("g").attr('class', data.key0 + " v.s. " + data.key1).attr("transform", "translate(" + this.margin.left + "," + (this.margin.top + (this.height * this.id) + (20 * this.id)) + ")");
      _.each(this.chartData, function(piece) {
        return chart.chartContainer.append("path").data([piece]).attr("class", "chart").style("fill", color(piece.mode)).style("fill-opacity", 0.0).transition().duration(animation_delay * (+piece.mode + 1)).attr("d", chart.area).style("fill-opacity", 0.8);
      });
      _.each(this.chartData, function(piece) {
        return chart.chartContainer.append("path").data([piece]).attr("class", "line").style("fill-opacity", 0.0).style("stroke", "white").transition().duration(animation_delay * (+piece.mode + 1)).attr("d", chart.line).style("stroke", color(piece.mode)).style("stroke-width", "2px").style("fill-opacity", 0.0);
      });
      this.xAxisTop = d3.svg.axis().scale(this.xScale).orient("bottom");
      this.xAxisBottom = d3.svg.axis().scale(this.xScale).orient("bottom");
      chartContainer.append("g").attr("class", "x axis bottom").attr("transform", "translate(0," + this.height + ")").call(this.xAxisBottom);
      this.yAxis = d3.svg.axis().scale(this.yScale).orient("left").ticks(5);
      chartContainer.append("g").attr("class", "y axis").attr("transform", "translate(0,0)").call(this.yAxis);
      this.chartContainer.append("text").attr("class", "axis-label").attr("transform", "translate(-15,20)").text(key0);
      this.chartContainer.append("text").attr("class", "axis-label").attr("transform", "translate(" + (+width - 2) + ", " + (height - 3) + ")").text(key1);
    }

    return Chart;

  })();

  margin = {
    top: 10,
    right: 40,
    bottom: 100,
    left: 60
  };

  width = 940 - margin.left - margin.right;

  height = 500 - margin.top - margin.bottom;

  svg = d3.select("#chart-container_twovar").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);

  d3.json('data.json', createChart);

}).call(this);
