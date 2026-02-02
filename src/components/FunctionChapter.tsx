'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FunctionSquare, Info, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, CheckCircle2, XCircle } from 'lucide-react';

export function FunctionChapter() {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-red-200 dark:border-red-800 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FunctionSquare className="h-6 w-6 text-red-600" />
            一次函数 - 数形结合
          </CardTitle>
          <CardDescription>
            动态图像、k和b的几何意义、应用问题
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="graph" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <TabsTrigger 
            value="graph"
            className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
          >
            动态图像
          </TabsTrigger>
          <TabsTrigger 
            value="properties"
            className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
          >
            函数性质
          </TabsTrigger>
          <TabsTrigger 
            value="equation"
            className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
          >
            方程与不等式
          </TabsTrigger>
          <TabsTrigger 
            value="application"
            className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
          >
            应用问题
          </TabsTrigger>
        </TabsList>

        <TabsContent value="graph">
          <FunctionGraph />
        </TabsContent>

        <TabsContent value="properties">
          <FunctionProperties />
        </TabsContent>

        <TabsContent value="equation">
          <EquationInequality />
        </TabsContent>

        <TabsContent value="application">
          <ApplicationProblem />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// 一次函数动态图像
function FunctionGraph() {
  const [k, setK] = useState(1);
  const [b, setB] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawGraph();
  }, [k, b]);

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 20;

    // 绘制坐标轴
    ctx.beginPath();
    ctx.moveTo(20, centerY);
    ctx.lineTo(canvas.width - 20, centerY);
    ctx.moveTo(centerX, 20);
    ctx.lineTo(centerX, canvas.height - 20);
    ctx.strokeStyle = '#9CA3AF';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 绘制网格
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    for (let i = -10; i <= 10; i++) {
      // 垂直线
      ctx.beginPath();
      ctx.moveTo(centerX + i * scale, 20);
      ctx.lineTo(centerX + i * scale, canvas.height - 20);
      ctx.stroke();
      // 水平线
      ctx.beginPath();
      ctx.moveTo(20, centerY + i * scale);
      ctx.lineTo(canvas.width - 20, centerY + i * scale);
      ctx.stroke();
    }

    // 绘制函数图像
    ctx.beginPath();
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 3;

    for (let pixelX = 20; pixelX < canvas.width - 20; pixelX++) {
      const x = (pixelX - centerX) / scale;
      const y = k * x + b;
      const pixelY = centerY - y * scale;

      if (pixelX === 20) {
        ctx.moveTo(pixelX, pixelY);
      } else {
        ctx.lineTo(pixelX, pixelY);
      }
    }
    ctx.stroke();

    // 绘制与坐标轴的交点
    // 与 x 轴交点（当 y = 0 时，x = -b/k）
    if (k !== 0) {
      const xIntercept = -b / k;
      const pixelXIntercept = centerX + xIntercept * scale;
      const pixelYIntercept = centerY;

      ctx.beginPath();
      ctx.arc(pixelXIntercept, pixelYIntercept, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#22C55E';
      ctx.fill();

      ctx.font = '12px Arial';
      ctx.fillStyle = '#22C55E';
      ctx.textAlign = 'center';
      ctx.fillText(`(${xIntercept.toFixed(1)}, 0)`, pixelXIntercept, pixelYIntercept + 20);
    }

    // 与 y 轴交点（当 x = 0 时，y = b）
    const pixelYIntercept2 = centerY - b * scale;
    const pixelXIntercept2 = centerX;

    ctx.beginPath();
    ctx.arc(pixelXIntercept2, pixelYIntercept2, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#3B82F6';
    ctx.fill();

    ctx.font = '12px Arial';
    ctx.fillStyle = '#3B82F6';
    ctx.textAlign = 'center';
    ctx.fillText(`(0, ${b})`, pixelXIntercept2 - 30, pixelYIntercept2);

    // 标注坐标轴
    ctx.font = '14px Arial';
    ctx.fillStyle = '#6B7280';
    ctx.fillText('x', canvas.width - 30, centerY - 10);
    ctx.fillText('y', centerX + 10, 30);
  };

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">一次函数 y = kx + b</CardTitle>
        <CardDescription>
          通过调整 k 和 b 观察函数图像的变化
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                斜率 k: {k}
              </label>
              <Slider
                value={[k]}
                onValueChange={(value) => setK(value[0])}
                min={-3}
                max={3}
                step={0.1}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                截距 b: {b}
              </label>
              <Slider
                value={[b]}
                onValueChange={(value) => setB(value[0])}
                min={-5}
                max={5}
                step={0.5}
                className="w-full"
              />
            </div>

            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-center text-lg font-mono font-bold text-red-600">
                y = {k}x {b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg space-y-2">
              <div className="font-medium text-sm">几何意义</div>
              <div className="flex items-center gap-2 text-sm">
                <Badge className="bg-blue-500">k</Badge>
                <span>决定直线的倾斜方向和程度</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge className="bg-green-500">b</Badge>
                <span>决定直线与 y 轴的交点位置</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <canvas
              ref={canvasRef}
              width={400}
              height={350}
              className="w-full bg-white dark:bg-gray-800 rounded-lg"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="font-medium mb-2">记忆口诀</div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>k > 0：上坡为正，直线上升</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-600" />
              <span>k &lt; 0：下坡为负，直线下降</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );


// 函数性质
function FunctionProperties() {
  const [k, setK] = useState(1);
  const [b, setB] = useState(0);

  const isIncreasing = k > 0;
  const isDecreasing = k < 0;
  const yIntercept = b;
  const xIntercept = k !== 0 ? -b / k : null;

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">函数性质分析</CardTitle>
        <CardDescription>
          分析一次函数的增减性、截距等性质
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                斜率 k: {k}
              </label>
              <Slider
                value={[k]}
                onValueChange={(value) => setK(value[0])}
                min={-3}
                max={3}
                step={0.1}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                截距 b: {b}
              </label>
              <Slider
                value={[b]}
                onValueChange={(value) => setB(value[0])}
                min={-5}
                max={5}
                step={0.5}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${isIncreasing ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
              <div className="font-medium mb-2 flex items-center gap-2">
                {isIncreasing ? (
                  <>
                    <ArrowUpRight className="h-5 w-5 text-green-600" />
                    单调性：增函数
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-5 w-5 text-red-600" />
                    单调性：减函数
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isIncreasing
                  ? `k = ${k} > 0，y 随 x 的增大而增大`
                  : `k = ${k} < 0，y 随 x 的增大而减小`}
              </p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="font-medium mb-2 flex items-center gap-2">
                <FunctionSquare className="h-5 w-5 text-blue-600" />
                截距
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>与 y 轴交点：</span>
                  <Badge className="bg-blue-500">(0, {yIntercept})</Badge>
                </div>
                {xIntercept !== null && (
                  <div className="flex justify-between">
                    <span>与 x 轴交点：</span>
                    <Badge className="bg-green-500">({xIntercept.toFixed(2)}, 0)</Badge>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="font-medium mb-2">陡峭程度</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                |k| = {Math.abs(k).toFixed(1)}，{Math.abs(k) > 1 ? '直线较陡' : Math.abs(k) < 1 ? '直线较平缓' : '直线斜率为1'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg flex items-start gap-2">
          <Info className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-2">核心性质总结</p>
            <p className="text-gray-600 dark:text-gray-400">
              • k > 0：增函数，从左下到右上<br />
              • k &lt; 0：减函数，从左上到右下<br />
              • |k| 越大，直线越陡<br />
              • b 决定直线与 y 轴的交点位置
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



// 方程与不等式
function EquationInequality() {
  const [k, setK] = useState(1);
  const [b, setB] = useState(0);
  const [value, setValue] = useState(2);

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">一次函数与方程、不等式</CardTitle>
        <CardDescription>
          理解函数、方程、不等式的关系
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                斜率 k: {k}
              </label>
              <Slider
                value={[k]}
                onValueChange={(value) => setK(value[0])}
                min={-3}
                max={3}
                step={0.1}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                截距 b: {b}
              </label>
              <Slider
                value={[b]}
                onValueChange={(value) => setB(value[0])}
                min={-5}
                max={5}
                step={0.5}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                求解值: {value}
              </label>
              <Slider
                value={[value]}
                onValueChange={(val) => setValue(val[0])}
                min={-5}
                max={5}
                step={0.5}
                className="w-full"
              />
            </div>
          </div>

          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="font-medium mb-3">函数关系</div>
            <div className="text-center text-lg font-mono font-bold text-red-600 mb-4">
              y = {k}x {b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="font-medium mb-2">方程</div>
              <div className="text-sm space-y-2">
                <p className="font-mono">kx + b = 0</p>
                {k !== 0 ? (
                  <p className="text-gray-600 dark:text-gray-400">
                    x = {(-b / k).toFixed(2)}
                  </p>
                ) : (
                  <p className="text-red-600">
                    {b === 0 ? '无穷多解' : '无解'}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  对应函数图像与 x 轴的交点
                </p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="font-medium mb-2">不等式（大于）</div>
              <div className="text-sm space-y-2">
                <p className="font-mono">kx + b > 0</p>
                {k !== 0 ? (
                  <p className="text-gray-600 dark:text-gray-400">
                    {k > 0 ? `x > ${(-b / k).toFixed(2)}` : `x < ${(-b / k).toFixed(2)}`}
                  </p>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">
                    {b > 0 ? 'x 为任意实数' : '无解'}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  对应函数图像在 x 轴上方部分
                </p>
              </div>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="font-medium mb-2">函数值</div>
              <div className="text-sm space-y-2">
                <p className="font-mono">当 x = {value} 时</p>
                <p className="text-gray-600 dark:text-gray-400">
                  y = {(k * value + b).toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">
                  在图像上找到 x = {value} 对应的 y 值
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-start gap-2">
            <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-2">数形结合</p>
              <p className="text-gray-600 dark:text-gray-400">
                方程 kx + b = 0 的解就是函数图像与 x 轴交点的横坐标；<br />
                不等式 kx + b > 0 的解就是函数图像在 x 轴上方部分对应的 x 的取值范围。
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



// 应用问题
function ApplicationProblem() {
  const [speed, setSpeed] = useState(60);
  const [initialDistance, setInitialDistance] = useState(100);

  const totalDistance = (x: number) => initialDistance + speed * x;

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">应用问题示例</CardTitle>
        <CardDescription>
          路程问题：汽车行驶距离与时间的关系
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="font-medium mb-2">问题描述</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              一辆汽车从距离目的地 {initialDistance} km 处出发，以 {speed} km/h 的速度行驶，
              求行驶距离与时间的关系。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  初始距离: {initialDistance} km
                </label>
                <Slider
                  value={[initialDistance]}
                  onValueChange={(value) => setInitialDistance(value[0])}
                  min={0}
                  max={200}
                  step={10}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  速度: {speed} km/h
                </label>
                <Slider
                  value={[speed]}
                  onValueChange={(value) => setSpeed(value[0])}
                  min={20}
                  max={120}
                  step={10}
                  className="w-full"
                />
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="font-medium mb-2">函数表达式</div>
                <div className="text-center text-lg font-mono font-bold text-green-600">
                  y = {speed}x {initialDistance >= 0 ? `+ ${initialDistance}` : `- ${Math.abs(initialDistance)}`}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  x: 时间（小时），y: 距离（km）
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="font-medium mb-2">实际应用</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>行驶 2 小时后距离：</span>
                    <Badge className="bg-purple-500">{totalDistance(2)} km</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>行驶 5 小时后距离：</span>
                    <Badge className="bg-purple-500">{totalDistance(5)} km</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>距离达到 500km 需要时间：</span>
                    <Badge className="bg-orange-500">{((500 - initialDistance) / speed).toFixed(2)} 小时</Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="font-medium mb-2">待定系数法步骤</div>
                <ol className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                  <li>1. 设 y = kx + b</li>
                  <li>2. 代入已知点列方程</li>
                  <li>3. 解出 k 和 b</li>
                  <li>4. 写出函数表达式</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg flex items-start gap-2">
            <Info className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-2">解题技巧</p>
              <p className="text-gray-600 dark:text-gray-400">
                遇到实际问题时，先明确自变量（x）和因变量（y）代表什么意义，
                找出两个已知条件，用待定系数法求出函数表达式。
                养成画图的习惯，通过图像理解问题本质。
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

