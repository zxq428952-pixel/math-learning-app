'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Scale, CheckCircle2, XCircle, RotateCcw, Info } from 'lucide-react';

export function CongruentChapter() {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-green-200 dark:border-green-800 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-green-600" />
            全等三角形 - 中考必考
          </CardTitle>
          <CardDescription>
            四种判定定理、证明方法、辅助线模型
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="sss" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <TabsTrigger 
            value="sss"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            SSS
          </TabsTrigger>
          <TabsTrigger 
            value="sas"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            SAS
          </TabsTrigger>
          <TabsTrigger 
            value="asa"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            ASA
          </TabsTrigger>
          <TabsTrigger 
            value="aas"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            AAS
          </TabsTrigger>
          <TabsTrigger 
            value="hl"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            HL
          </TabsTrigger>
          <TabsTrigger 
            value="practice"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            练习题
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sss">
          <SSSDemo />
        </TabsContent>

        <TabsContent value="sas">
          <SASDemo />
        </TabsContent>

        <TabsContent value="asa">
          <ASADemo />
        </TabsContent>

        <TabsContent value="aas">
          <AASDemo />
        </TabsContent>

        <TabsContent value="hl">
          <HLDemo />
        </TabsContent>

        <TabsContent value="practice">
          <CongruentPractice />
        </TabsContent>
      </Tabs>

      <Card className="bg-white/90 dark:bg-gray-800/90">
        <CardHeader>
          <CardTitle className="text-lg">判定定理记忆口诀</CardTitle>
          <CardDescription>
            判定三角形全等的关键
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Badge className="bg-green-500 mb-2">✓ 能判全等</Badge>
              <ul className="text-sm space-y-1">
                <li>• SSS: 三边对应相等</li>
                <li>• SAS: 两边及夹角对应相等</li>
                <li>• ASA: 两角及夹边对应相等</li>
                <li>• AAS: 两角及其中一角的对边对应相等</li>
                <li>• HL: 直角三角形斜边和一直角边对应相等</li>
              </ul>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <Badge variant="destructive" className="mb-2">✗ 不能判全等</Badge>
              <ul className="text-sm space-y-1">
                <li>• SSA: 两边及其中一边的对角对应相等</li>
                <li>• AAA: 三角对应相等</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// SSS 判定演示
function SSSDemo() {
  const [sideAB, setSideAB] = useState(100);
  const [sideBC, setSideBC] = useState(100);
  const [sideCA, setSideCA] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawTriangles();
  }, [sideAB, sideBC, sideCA]);

  const drawTriangles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制第一个三角形
    drawTriangle(ctx, 100, 150, sideAB, sideBC, sideCA, '#22C55E', '△ABC');

    // 绘制第二个三角形（与第一个全等）
    drawTriangle(ctx, 300, 150, sideAB, sideBC, sideCA, '#3B82F6', '△DEF');
  };

  const drawTriangle = (
    ctx: CanvasRenderingContext2D,
    offsetX: number,
    offsetY: number,
    a: number,
    b: number,
    c: number,
    color: string,
    label: string
  ) => {
    const centerX = offsetX;
    const centerY = offsetY;
    const scale = 0.8;

    const sideA = a * scale;
    const sideB = b * scale;
    const sideC = c * scale;

    const angle1 = Math.acos((sideB * sideB + sideC * sideC - sideA * sideA) / (2 * sideB * sideC));
    const x1 = centerX;
    const y1 = centerY + 80;
    const x2 = centerX + sideB * Math.cos(angle1);
    const y2 = centerY + 80 - sideB * Math.sin(angle1);
    const x3 = centerX + sideC;
    const y3 = centerY + 80;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();

    ctx.fillStyle = color.replace(')', ', 0.2)').replace('rgb', 'rgba');
    ctx.fill();

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();

    // 标注边长
    ctx.font = '12px Arial';
    ctx.fillStyle = color;
    ctx.fillText(`${a}`, (x2 + x3) / 2 - 10, (y2 + y3) / 2 - 10);
    ctx.fillText(`${b}`, (x1 + x2) / 2 - 10, (y1 + y2) / 2 - 10);
    ctx.fillText(`${c}`, (x1 + x3) / 2 + 10, (y1 + y3) / 2 + 20);

    // 标注标签
    ctx.font = 'bold 14px Arial';
    ctx.fillText(label, centerX - 30, centerY - 100);
  };

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">SSS 判定定理</CardTitle>
        <CardDescription>
          三边对应相等的两个三角形全等
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">边 AB = 边 DE: {sideAB}</label>
              <Slider
                value={[sideAB]}
                onValueChange={(value) => setSideAB(value[0])}
                min={60}
                max={150}
                step={5}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">边 BC = 边 EF: {sideBC}</label>
              <Slider
                value={[sideBC]}
                onValueChange={(value) => setSideBC(value[0])}
                min={60}
                max={150}
                step={5}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">边 CA = 边 FD: {sideCA}</label>
              <Slider
                value={[sideCA]}
                onValueChange={(value) => setSideCA(value[0])}
                min={60}
                max={150}
                step={5}
                className="w-full"
              />
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">
                AB = DE, BC = EF, CA = FD → △ABC ≅ △DEF
              </span>
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

// 练习题组件
