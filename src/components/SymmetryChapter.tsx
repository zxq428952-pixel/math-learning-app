'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { MoveHorizontal, Info, RotateCcw } from 'lucide-react';

export function SymmetryChapter() {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-200 dark:border-purple-800 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MoveHorizontal className="h-6 w-6 text-purple-600" />
            轴对称 - 承上启下
          </CardTitle>
          <CardDescription>
            等腰三角形、三线合一、最短路径问题
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="isosceles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <TabsTrigger 
            value="isosceles"
            className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
          >
            等腰三角形
          </TabsTrigger>
          <TabsTrigger 
            value="symmetry"
            className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
          >
            轴对称图形
          </TabsTrigger>
          <TabsTrigger 
            value="general"
            className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
          >
            将军饮马
          </TabsTrigger>
        </TabsList>

        <TabsContent value="isosceles">
          <IsoscelesTriangleDemo />
        </TabsContent>

        <TabsContent value="symmetry">
          <SymmetryDemo />
        </TabsContent>

        <TabsContent value="general">
          <GeneralProblemDemo />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// 等腰三角形三线合一演示
function IsoscelesTriangleDemo() {
  const [baseAngle, setBaseAngle] = useState(50);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawTriangle();
  }, [baseAngle]);

  const drawTriangle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const size = 100;

    const rad = (baseAngle * Math.PI) / 180;

    // 计算三角形顶点
    const x1 = centerX;
    const y1 = centerY - size;

    const x2 = centerX + size * Math.cos(rad);
    const y2 = centerY + size * Math.sin(rad);

    const x3 = centerX - size * Math.cos(rad);
    const y3 = centerY + size * Math.sin(rad);

    // 绘制三角形
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();

    ctx.fillStyle = 'rgba(168, 85, 247, 0.2)';
    ctx.fill();

    ctx.strokeStyle = '#A855F7';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 绘制三线（三线合一）
    // 1. 顶角平分线
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(centerX, y2);
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. 底边中线
    ctx.beginPath();
    ctx.moveTo(centerX, y2);
    ctx.lineTo(centerX, y2);
    ctx.strokeStyle = '#22C55E';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 3. 底边高线
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(centerX, y2);
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 标注
    ctx.font = '14px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText('顶角平分线', centerX + 10, y1 + 30);
    ctx.fillText('底边中线', centerX - 40, y2 - 10);
    ctx.fillText('底边高线', centerX + 10, y1 + 30);

    // 标注角度
    ctx.font = '12px Arial';
    ctx.fillStyle = '#A855F7';
    ctx.fillText(`${baseAngle}°`, x2 + 10, y2 - 20);
    ctx.fillText(`${baseAngle}°`, x3 - 30, y3 - 20);
    
    const topAngle = 180 - 2 * baseAngle;
    ctx.fillText(`${topAngle}°`, x1 - 20, y1 + 10);
  };

  const topAngle = 180 - 2 * baseAngle;

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">等腰三角形"三线合一"</CardTitle>
        <CardDescription>
          顶角平分线、底边中线、底边高线重合
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                底角: {baseAngle}°
              </label>
              <Slider
                value={[baseAngle]}
                onValueChange={(value) => setBaseAngle(value[0])}
                min={30}
                max={70}
                step={5}
                className="w-full"
              />
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg space-y-2">
              <div className="font-medium text-purple-900 dark:text-purple-100 mb-3">
                三线合一性质
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 bg-red-500 rounded-full" />
                <span>顶角平分线</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 bg-green-500 rounded-full" />
                <span>底边中线</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 bg-blue-500 rounded-full" />
                <span>底边高线</span>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-sm font-medium mb-2">计算结果</div>
              <div className="space-y-1 text-sm">
                <p>底角 = {baseAngle}°</p>
                <p>顶角 = {topAngle}°</p>
                <p>内角和 = {180}° ✓</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <canvas
              ref={canvasRef}
              width={400}
              height={300}
              className="w-full bg-white dark:bg-gray-800 rounded-lg"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-start gap-2">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-2">口诀："看到等腰，就找三线"</p>
            <p className="text-gray-600 dark:text-gray-400">
              这是等腰三角形解题的万能钥匙。在证明题中，如果遇到等腰三角形，
              立即想到利用三线合一性质，往往能迅速找到解题思路。
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 轴对称图形演示
function SymmetryDemo() {
  const [showOriginal, setShowOriginal] = useState(true);
  const [showReflection, setShowReflection] = useState(true);
  const [showAxis, setShowAxis] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawSymmetry();
  }, [showOriginal, showReflection, showAxis]);

  const drawSymmetry = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;

    // 绘制对称轴
    if (showAxis) {
      ctx.beginPath();
      ctx.moveTo(centerX, 20);
      ctx.lineTo(centerX, canvas.height - 20);
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.font = '14px Arial';
      ctx.fillStyle = '#F59E0B';
      ctx.textAlign = 'center';
      ctx.fillText('对称轴', centerX, 30);
    }

    // 绘制原始图形（三角形）
    if (showOriginal) {
      const size = 60;
      const offsetX = centerX - 80;
      const offsetY = 150;

      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
      ctx.lineTo(offsetX + size, offsetY + size);
      ctx.lineTo(offsetX - size, offsetY + size);
      ctx.closePath();

      ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
      ctx.fill();

      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.font = '14px Arial';
      ctx.fillStyle = '#3B82F6';
      ctx.textAlign = 'center';
      ctx.fillText('原图', offsetX, offsetY - 20);
    }

    // 绘制对称图形
    if (showReflection) {
      const size = 60;
      const offsetX = centerX + 80;
      const offsetY = 150;

      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
      ctx.lineTo(offsetX + size, offsetY + size);
      ctx.lineTo(offsetX - size, offsetY + size);
      ctx.closePath();

      ctx.fillStyle = 'rgba(168, 85, 247, 0.5)';
      ctx.fill();

      ctx.strokeStyle = '#A855F7';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.font = '14px Arial';
      ctx.fillStyle = '#A855F7';
      ctx.textAlign = 'center';
      ctx.fillText('对称图', offsetX, offsetY - 20);
    }
  };

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">轴对称图形</CardTitle>
        <CardDescription>
          沿对称轴折叠后完全重合的图形
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-sm font-medium">显示原图</span>
              <input
                type="checkbox"
                checked={showOriginal}
                onChange={(e) => setShowOriginal(e.target.checked)}
                className="w-5 h-5"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-sm font-medium">显示对称图</span>
              <input
                type="checkbox"
                checked={showReflection}
                onChange={(e) => setShowReflection(e.target.checked)}
                className="w-5 h-5"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-sm font-medium">显示对称轴</span>
              <input
                type="checkbox"
                checked={showAxis}
                onChange={(e) => setShowAxis(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg space-y-2">
              <div className="font-medium text-sm">轴对称的性质</div>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• 对称轴是对称点连线的垂直平分线</li>
                <li>• 对称点到对称轴的距离相等</li>
                <li>• 对称图形的形状和大小相同</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <canvas
              ref={canvasRef}
              width={400}
              height={300}
              className="w-full bg-white dark:bg-gray-800 rounded-lg"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 将军饮马模型（最短路径问题）
function GeneralProblemDemo() {
  const [pointX1, setPointX1] = useState(80);
  const [pointY1, setPointY1] = useState(80);
  const [pointX2, setPointX2] = useState(320);
  const [pointY2, setPointY2] = useState(80);
  const [lineY, setLineY] = useState(200);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawGeneral();
  }, [pointX1, pointY1, pointX2, pointY2, lineY]);

  const drawGeneral = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制直线（河流）
    ctx.beginPath();
    ctx.moveTo(20, lineY);
    ctx.lineTo(canvas.width - 20, lineY);
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.font = '14px Arial';
    ctx.fillStyle = '#3B82F6';
    ctx.fillText('河流（对称轴）', 20, lineY - 10);

    // 绘制点 A 和 B
    ctx.beginPath();
    ctx.arc(pointX1, pointY1, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#EF4444';
    ctx.fill();
    ctx.font = 'bold 14px Arial';
    ctx.fillText('A', pointX1 - 5, pointY1 - 15);

    ctx.beginPath();
    ctx.arc(pointX2, pointY2, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#22C55E';
    ctx.fill();
    ctx.fillText('B', pointX2 - 5, pointY2 - 15);

    // 找到 B 关于直线的对称点 B'
    const BprimeY = lineY + (lineY - pointY2);
    ctx.beginPath();
    ctx.arc(pointX2, BprimeY, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#22C55E';
    ctx.fill();
    ctx.fillText("B'", pointX2 - 5, BprimeY + 25);

    // 绘制 BB' 虚线
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(pointX2, pointY2);
    ctx.lineTo(pointX2, BprimeY);
    ctx.strokeStyle = '#9CA3AF';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);

    // 计算最优点 P（AP + PB 最小）
    // 根据反射原理，最优点是 AB' 与直线的交点
    // 直线方程：y = lineY
    // AB' 的斜率 k = (BprimeY - pointY1) / (pointX2 - pointX1)
    // AB' 的方程：y - pointY1 = k(x - pointX1)
    // 当 y = lineY 时：lineY - pointY1 = k(x - pointX1)
    // x = pointX1 + (lineY - pointY1) / k
    
    const k = (BprimeY - pointY1) / (pointX2 - pointX1);
    const optimalX = pointX1 + (lineY - pointY1) / k;
    const optimalY = lineY;

    // 绘制最优路径 A -> P -> B
    ctx.beginPath();
    ctx.moveTo(pointX1, pointY1);
    ctx.lineTo(optimalX, optimalY);
    ctx.lineTo(pointX2, pointY2);
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 绘制 A -> B' 的直线
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(pointX1, pointY1);
    ctx.lineTo(pointX2, BprimeY);
    ctx.strokeStyle = '#9CA3AF';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);

    // 绘制最优点 P
    ctx.beginPath();
    ctx.arc(optimalX, optimalY, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#F59E0B';
    ctx.fill();
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#F59E0B';
    ctx.fillText('P', optimalX - 5, optimalY + 20);

    // 计算距离
    const distance1 = Math.sqrt(Math.pow(optimalX - pointX1, 2) + Math.pow(optimalY - pointY1, 2));
    const distance2 = Math.sqrt(Math.pow(pointX2 - optimalX, 2) + Math.pow(pointY2 - optimalY, 2));
    const totalDistance = distance1 + distance2;
  };

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">将军饮马模型（最短路径问题）</CardTitle>
        <CardDescription>
          口诀："两定一动，作对称，连定点"
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="font-medium text-sm mb-3">问题描述</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                点 A、B 在河流同侧，在河流上找一点 P，使 AP + BP 的距离最短。
              </p>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="font-medium text-sm mb-3">解题步骤</div>
              <ol className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                <li>1. 作点 B 关于河流的对称点 B'</li>
                <li>2. 连接 A 和 B'</li>
                <li>3. AB' 与河流的交点即为最优点 P</li>
              </ol>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="font-medium text-sm mb-3">原理说明</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                由于 BP = B'P，所以 AP + BP = AP + B'P。根据"两点之间线段最短"，
                当 A、P、B' 三点共线时，距离最短。
              </p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <canvas
              ref={canvasRef}
              width={400}
              height={300}
              className="w-full bg-white dark:bg-gray-800 rounded-lg"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-start gap-2">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-2">记忆方法</p>
            <p className="text-gray-600 dark:text-gray-400">
              想象将军（动点 P）要去河边（对称轴）饮马，然后回军营（点 B），
              怎样走最短？动手画图演绎这个故事，在纸上画10遍，形成视觉记忆。
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
