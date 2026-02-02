'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Info, CheckCircle2, XCircle, Crosshair } from 'lucide-react';

export function CoordinateChapter() {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-green-200 dark:border-green-800 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-green-600" />
            位置与坐标
          </CardTitle>
          <CardDescription>
            学习平面直角坐标系、点的位置确定、距离计算等
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="coordinate" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <TabsTrigger value="coordinate" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
            直角坐标系
          </TabsTrigger>
          <TabsTrigger value="quadrant" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
            象限与对称
          </TabsTrigger>
          <TabsTrigger value="distance" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
            距离与中点
          </TabsTrigger>
          <TabsTrigger value="practice" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
            练习题
          </TabsTrigger>
        </TabsList>

        <TabsContent value="coordinate">
          <CoordinateSystem />
        </TabsContent>

        <TabsContent value="quadrant">
          <QuadrantSymmetry />
        </TabsContent>

        <TabsContent value="distance">
          <DistanceMidpoint />
        </TabsContent>

        <TabsContent value="practice">
          <CoordinatePractice />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// 直角坐标系组件
function CoordinateSystem() {
  const [pointX, setPointX] = useState(3);
  const [pointY, setPointY] = useState(2);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawGrid();
  }, [pointX, pointY]);

  const drawGrid = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 30;

    // 绘制网格
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;

    // 垂直线
    for (let i = -7; i <= 7; i++) {
      ctx.beginPath();
      ctx.moveTo(centerX + i * scale, 0);
      ctx.lineTo(centerX + i * scale, canvas.height);
      ctx.stroke();
    }

    // 水平线
    for (let i = -6; i <= 6; i++) {
      ctx.beginPath();
      ctx.moveTo(0, centerY + i * scale);
      ctx.lineTo(canvas.width, centerY + i * scale);
      ctx.stroke();
    }

    // 绘制坐标轴
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;

    // X轴
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();

    // Y轴
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();

    // 箭头
    ctx.fillStyle = '#374151';
    ctx.beginPath();
    ctx.moveTo(canvas.width - 10, centerY - 5);
    ctx.lineTo(canvas.width, centerY);
    ctx.lineTo(canvas.width - 10, centerY + 5);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(centerX - 5, 10);
    ctx.lineTo(centerX, 0);
    ctx.lineTo(centerX + 5, 10);
    ctx.fill();

    // 坐标轴标签
    ctx.font = '14px Arial';
    ctx.fillStyle = '#374151';
    ctx.textAlign = 'center';
    ctx.fillText('x', canvas.width - 15, centerY + 20);
    ctx.fillText('y', centerX + 20, 15);
    ctx.fillText('O', centerX - 15, centerY + 20);

    // 刻度
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    for (let i = -6; i <= 6; i++) {
      if (i !== 0) {
        ctx.fillText(i.toString(), centerX + i * scale, centerY + 15);
        ctx.fillText(i.toString(), centerX - 15, centerY - i * scale + 3);
      }
    }

    // 绘制点
    const px = centerX + pointX * scale;
    const py = centerY - pointY * scale;

    ctx.beginPath();
    ctx.arc(px, py, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#22C55E';
    ctx.fill();
    ctx.strokeStyle = '#14532D';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 绘制投影线
    ctx.strokeStyle = '#22C55E';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);

    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px, centerY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(centerX, py);
    ctx.stroke();

    ctx.setLineDash([]);

    // 标注点坐标
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = '#22C55E';
    ctx.textAlign = 'left';
    ctx.fillText(`(${pointX}, ${pointY})`, px + 10, py - 10);
  };

  const determineQuadrant = () => {
    if (pointX > 0 && pointY > 0) return '第一象限';
    if (pointX < 0 && pointY > 0) return '第二象限';
    if (pointX < 0 && pointY < 0) return '第三象限';
    if (pointX > 0 && pointY < 0) return '第四象限';
    if (pointX === 0 && pointY === 0) return '原点';
    if (pointX === 0) return 'Y轴上';
    return 'X轴上';
  };

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">平面直角坐标系</CardTitle>
        <CardDescription>在坐标系中表示点的位置</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">横坐标 x: {pointX}</label>
              <Slider
                value={[pointX]}
                onValueChange={(v) => setPointX(v[0])}
                min={-6}
                max={6}
                step={1}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">纵坐标 y: {pointY}</label>
              <Slider
                value={[pointY]}
                onValueChange={(v) => setPointY(v[0])}
                min={-5}
                max={5}
                step={1}
                className="w-full"
              />
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg space-y-2">
              <div className="font-medium">点 P({pointX}, {pointY}) 的位置：</div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500">{determineQuadrant()}</Badge>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {pointX > 0 && <div>- x 大于 0，在 Y 轴右侧</div>}
                {pointX < 0 && <div>- x 小于 0，在 Y 轴左侧</div>}
                {pointY > 0 && <div>- y 大于 0，在 X 轴上方</div>}
                {pointY < 0 && <div>- y 小于 0，在 X 轴下方</div>}
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

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-start gap-2">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-2">平面直角坐标系</p>
            <p className="text-gray-600 dark:text-gray-400">
              平面直角坐标系由两条互相垂直的数轴（x轴和y轴）组成，交点为原点 O(0,0)。
              任意一点 P 的位置用有序数对 (x, y) 表示，其中 x 为横坐标，y 为纵坐标。
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 象限与对称组件
function QuadrantSymmetry() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedPoint, setSelectedPoint] = useState(0);

  useEffect(() => {
    drawQuadrants();
  }, [selectedPoint]);

  const drawQuadrants = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // 绘制象限背景色
    const quadrants = [
      { x: centerX, y: 0, w: centerX, h: centerY, color: 'rgba(34, 197, 94, 0.1)', label: '第一象限' },
      { x: 0, y: 0, w: centerX, h: centerY, color: 'rgba(59, 130, 246, 0.1)', label: '第二象限' },
      { x: 0, y: centerY, w: centerX, h: centerY, color: 'rgba(239, 68, 68, 0.1)', label: '第三象限' },
      { x: centerX, y: centerY, w: centerX, h: centerY, color: 'rgba(168, 85, 247, 0.1)', label: '第四象限' },
    ];

    quadrants.forEach((q, i) => {
      ctx.fillStyle = q.color;
      ctx.fillRect(q.x, q.y, q.w, q.h);
      ctx.font = '14px Arial';
      ctx.fillStyle = '#6B7280';
      ctx.textAlign = 'center';
      ctx.fillText(q.label, q.x + q.w / 2, q.y + q.h / 2);
    });

    // 绘制坐标轴
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();

    // 绘制点和对称点
    const basePoints = [
      { x: 2, y: 3, color: '#22C55E', label: 'P' },
      { x: -2, y: 3, color: '#3B82F6', label: 'P₁' },
      { x: -2, y: -3, color: '#EF4444', label: 'P₂' },
      { x: 2, y: -3, color: '#A855F7', label: 'P₃' },
    ];

    const scale = 35;
    basePoints.forEach((p, i) => {
      const px = centerX + p.x * scale;
      const py = centerY - p.y * scale;

      ctx.beginPath();
      ctx.arc(px, py, 8, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = 'bold 14px Arial';
      ctx.fillStyle = '#374151';
      ctx.textAlign = 'center';
      ctx.fillText(p.label, px, py - 15);
    });

    // 绘制对称关系线
    if (selectedPoint >= 0 && selectedPoint < 4) {
      const p = basePoints[selectedPoint];
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);

      const px = centerX + p.x * scale;
      const py = centerY - p.y * scale;

      // 关于X轴对称
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px, centerY);
      ctx.stroke();

      // 关于Y轴对称
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(centerX, py);
      ctx.stroke();

      // 关于原点对称
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(centerX, centerY);
      ctx.stroke();

      ctx.setLineDash([]);
    }
  };

  const symmetryInfo = [
    {
      point: 'P(2, 3)',
      xAxis: '(2, -3)',
      yAxis: '(-2, 3)',
      origin: '(-2, -3)',
      description: 'P 在第一象限'
    },
    {
      point: 'P₁(-2, 3)',
      xAxis: '(-2, -3)',
      yAxis: '(2, 3)',
      origin: '(2, -3)',
      description: 'P₁ 在第二象限'
    },
    {
      point: 'P₂(-2, -3)',
      xAxis: '(-2, 3)',
      yAxis: '(2, -3)',
      origin: '(2, 3)',
      description: 'P₂ 在第三象限'
    },
    {
      point: 'P₃(2, -3)',
      xAxis: '(2, 3)',
      yAxis: '(-2, -3)',
      origin: '(-2, 3)',
      description: 'P₃ 在第四象限'
    },
  ];

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">象限与点的对称</CardTitle>
        <CardDescription>四个象限和点的对称关系</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <Button
                  key={i}
                  onClick={() => setSelectedPoint(i)}
                  variant={selectedPoint === i ? 'default' : 'outline'}
                  className="w-full"
                >
                  {symmetryInfo[i].point}
                </Button>
              ))}
            </div>

            {selectedPoint >= 0 && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg space-y-3">
                <div className="font-medium">{symmetryInfo[selectedPoint].description}</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500">关于 X 轴对称</Badge>
                    <span className="font-mono">{symmetryInfo[selectedPoint].xAxis}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-500">关于 Y 轴对称</Badge>
                    <span className="font-mono">{symmetryInfo[selectedPoint].yAxis}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-500">关于原点对称</Badge>
                    <span className="font-mono">{symmetryInfo[selectedPoint].origin}</span>
                  </div>
                </div>
              </div>
            )}
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

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-start gap-2">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-2">点的对称性</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>关于 X 轴对称：(x, y) 变为 (x, -y)</li>
              <li>关于 Y 轴对称：(x, y) 变为 (-x, y)</li>
              <li>关于原点对称：(x, y) 变为 (-x, -y)</li>
              <li>第一象限：x 大于 0, y 大于 0 | 第二象限：x 小于 0, y 大于 0</li>
              <li>第三象限：x 小于 0, y 小于 0 | 第四象限：x 大于 0, y 小于 0</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 距离与中点组件
function DistanceMidpoint() {
  const [p1x, setP1x] = useState(2);
  const [p1y, setP1y] = useState(1);
  const [p2x, setP2x] = useState(5);
  const [p2y, setP2y] = useState(4);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const distance = Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2)).toFixed(2);
  const midX = ((p1x + p2x) / 2).toFixed(1);
  const midY = ((p1y + p2y) / 2).toFixed(1);

  useEffect(() => {
    drawPoints();
  }, [p1x, p1y, p2x, p2y]);

  const drawPoints = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 30;

    // 绘制网格
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;

    for (let i = -6; i <= 6; i++) {
      ctx.beginPath();
      ctx.moveTo(centerX + i * scale, 0);
      ctx.lineTo(centerX + i * scale, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, centerY + i * scale);
      ctx.lineTo(canvas.width, centerY + i * scale);
      ctx.stroke();
    }

    // 绘制坐标轴
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();

    // 计算坐标
    const p1px = centerX + p1x * scale;
    const p1py = centerY - p1y * scale;
    const p2px = centerX + p2x * scale;
    const p2py = centerY - p2y * scale;
    const midpx = centerX + parseFloat(midX) * scale;
    const midpy = centerY - parseFloat(midY) * scale;

    // 绘制连接线
    ctx.strokeStyle = '#22C55E';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(p1px, p1py);
    ctx.lineTo(p2px, p2py);
    ctx.stroke();

    // 绘制点P1
    ctx.beginPath();
    ctx.arc(p1px, p1py, 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#3B82F6';
    ctx.fill();
    ctx.strokeStyle = '#1E40AF';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = '#3B82F6';
    ctx.textAlign = 'left';
    ctx.fillText(`P₁(${p1x}, ${p1y})`, p1px + 12, p1py - 5);

    // 绘制点P2
    ctx.beginPath();
    ctx.arc(p2px, p2py, 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#3B82F6';
    ctx.fill();
    ctx.strokeStyle = '#1E40AF';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = '#3B82F6';
    ctx.textAlign = 'right';
    ctx.fillText(`P₂(${p2x}, ${p2y})`, p2px - 12, p2py + 5);

    // 绘制中点
    ctx.beginPath();
    ctx.arc(midpx, midpy, 10, 0, 2 * Math.PI);
    ctx.fillStyle = '#22C55E';
    ctx.fill();
    ctx.strokeStyle = '#14532D';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = '#22C55E';
    ctx.textAlign = 'center';
    ctx.fillText(`M(${midX}, ${midY})`, midpx, midpy - 15);
  };

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">距离与中点公式</CardTitle>
        <CardDescription>计算两点间的距离和中点坐标</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">点 P₁ x: {p1x}</label>
              <Slider value={[p1x]} onValueChange={(v) => setP1x(v[0])} min={-5} max={5} step={1} className="w-full" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">点 P₁ y: {p1y}</label>
              <Slider value={[p1y]} onValueChange={(v) => setP1y(v[0])} min={-5} max={5} step={1} className="w-full" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">点 P₂ x: {p2x}</label>
              <Slider value={[p2x]} onValueChange={(v) => setP2x(v[0])} min={-5} max={5} step={1} className="w-full" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">点 P₂ y: {p2y}</label>
              <Slider value={[p2y]} onValueChange={(v) => setP2y(v[0])} min={-5} max={5} step={1} className="w-full" />
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <canvas ref={canvasRef} width={400} height={300} className="w-full bg-white dark:bg-gray-800 rounded-lg" />
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Crosshair className="h-5 w-5 text-blue-600" />
              <span className="font-medium">距离公式</span>
            </div>
            <div className="font-mono text-sm space-y-2">
              <div>d = √[(x₂-x₁)² + (y₂-y₁)²]</div>
              <div className="border-t pt-2">
                d = √[({p2x}-{p1x})² + ({p2y}-{p1y})²]
              </div>
              <div>
                d = √[{(p2x - p1x) ** 2} + {(p2y - p1y) ** 2}]
              </div>
              <div className="font-bold text-blue-600 text-lg">
                d = {distance}
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-5 w-5 text-green-600" />
              <span className="font-medium">中点公式</span>
            </div>
            <div className="font-mono text-sm space-y-2">
              <div>M = ((x₁+x₂)/2, (y₁+y₂)/2)</div>
              <div className="border-t pt-2">
                M = (({p1x}+{p2x})/2, ({p1y}+{p2y})/2)
              </div>
              <div>
                M = ({(p1x + p2x) / 2}, {(p1y + p2y) / 2})
              </div>
              <div className="font-bold text-green-600 text-lg">
                M = ({midX}, {midY})
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 练习题组件
function CoordinatePractice() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const questions = [
    {
      question: "点 P(3, -2) 在哪个象限？",
      options: ["第一象限", "第二象限", "第三象限", "第四象限"],
      correctAnswer: 3,
      explanation: "点 P(3, -2) 中，x = 3 大于 0，y = -2 小于 0，因此在第四象限。"
    },
    {
      question: "点 P(-2, 5) 关于 X 轴对称的点的坐标是？",
      options: ["(2, -5)", "(-2, -5)", "(2, 5)", "(-2, 5)"],
      correctAnswer: 1,
      explanation: "关于 X 轴对称，横坐标不变，纵坐标取相反数，因此 (-2, 5) 变为 (-2, -5)。"
    },
    {
      question: "点 A(1, 3) 和 B(4, 7) 之间的距离是？",
      options: ["4", "5", "6", "√34"],
      correctAnswer: 1,
      explanation: "d = √[(4-1)² + (7-3)²] = √[3² + 4²] = √[9 + 16] = √25 = 5。"
    },
    {
      question: "线段 AB 的两个端点坐标分别为 A(-2, 1) 和 B(4, 3)，则线段 AB 的中点坐标是？",
      options: ["(1, 2)", "(2, 2)", "(2, 1)", "(1, 1)"],
      correctAnswer: 0,
      explanation: "中点坐标 M = ((-2+4)/2, (1+3)/2) = (2/2, 4/2) = (1, 2)。"
    },
    {
      question: "若点 P(x, y) 在第二象限，则 x 和 y 的符号是？",
      options: ["x 大于 0, y 大于 0", "x 小于 0, y 大于 0", "x 小于 0, y 小于 0", "x 大于 0, y 小于 0"],
      correctAnswer: 1,
      explanation: "第二象限的点满足 x 小于 0（在 Y 轴左侧），y 大于 0（在 X 轴上方）。"
    }
  ];

  const currentQ = questions[currentQuestion];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(String(index));
    setShowResult(true);
    if (index === currentQ.correctAnswer) {
      setCorrectCount(correctCount + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetPractice = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectCount(0);
  };

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">位置与坐标练习题</CardTitle>
        <CardDescription>巩固坐标系的掌握</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {currentQuestion < questions.length ? (
            <>
              <div className="flex justify-between items-center">
                <Badge className="bg-green-500">第 {currentQuestion + 1} / {questions.length} 题</Badge>
                <Badge className="bg-blue-500">正确率: {correctCount}/{currentQuestion + (showResult ? 1 : 0)}</Badge>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => !showResult && handleAnswer(index)}
                      variant={selectedAnswer === String(index) ? (index === currentQ.correctAnswer ? "default" : "destructive") : showResult && index === currentQ.correctAnswer ? "default" : "outline"}
                      className={`w-full justify-start text-left h-auto py-3 px-4 ${selectedAnswer === String(index) ? (index === currentQ.correctAnswer ? "bg-green-500" : "bg-red-500") : showResult && index === currentQ.correctAnswer ? "bg-green-500" : ""}`}
                      disabled={showResult}
                    >
                      <span className="mr-3 font-medium">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              {showResult && (
                <div className={`p-4 rounded-lg ${selectedAnswer === String(currentQ.correctAnswer) ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {selectedAnswer === String(currentQ.correctAnswer) ? <CheckCircle2 className="h-5 w-5 text-green-600" /> : <XCircle className="h-5 w-5 text-red-600" />}
                    <span className="font-medium">{selectedAnswer === String(currentQ.correctAnswer) ? "回答正确！" : "回答错误"}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">解析：{currentQ.explanation}</p>
                </div>
              )}

              {showResult && currentQuestion < questions.length - 1 && <Button onClick={nextQuestion} className="w-full">下一题</Button>}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">练习完成！</h3>
              <p className="text-lg mb-6">你答对了 <span className="text-green-600 font-bold">{correctCount}</span> / {questions.length} 题</p>
              <Button onClick={resetPractice} size="lg">重新练习</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
