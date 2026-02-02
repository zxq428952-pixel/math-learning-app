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
        <TabsList className="grid w-full grid-cols-5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
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

// SAS 判定演示
function SASDemo() {
  const [sideAB, setSideAB] = useState(100);
  const [angleA, setAngleA] = useState(60);
  const [sideAC, setSideAC] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawTriangles();
  }, [sideAB, angleA, sideAC]);

  const drawTriangles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制第一个三角形
    drawTriangle(ctx, 100, 150, sideAB, angleA, sideAC, '#22C55E', '△ABC');

    // 绘制第二个三角形
    drawTriangle(ctx, 300, 150, sideAB, angleA, sideAC, '#3B82F6', '△DEF');
  };

  const drawTriangle = (
    ctx: CanvasRenderingContext2D,
    offsetX: number,
    offsetY: number,
    side1: number,
    angle: number,
    side2: number,
    color: string,
    label: string
  ) => {
    const centerX = offsetX;
    const centerY = offsetY;
    const scale = 0.8;

    const rad = (angle * Math.PI) / 180;

    const x1 = centerX;
    const y1 = centerY + 80;
    const x2 = centerX + side1 * scale;
    const y2 = centerY + 80;
    const x3 = centerX + side2 * scale * Math.cos(rad);
    const y3 = centerY + 80 - side2 * scale * Math.sin(rad);

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

    // 绘制角标记
    ctx.beginPath();
    ctx.arc(x1, y1, 25, 0, -rad);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 标注
    ctx.font = '12px Arial';
    ctx.fillStyle = color;
    ctx.fillText(`${side1}`, (x1 + x2) / 2 - 10, (y1 + y2) / 2 - 10);
    ctx.fillText(`${side2}`, (x1 + x3) / 2 - 10, (y1 + y3) / 2 - 10);
    ctx.fillText(`${angle}°`, x1 + 35, y1 - 5);

    ctx.font = 'bold 14px Arial';
    ctx.fillText(label, centerX - 30, centerY - 100);
  };

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">SAS 判定定理</CardTitle>
        <CardDescription>
          两边及其夹角对应相等的两个三角形全等
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
              <label className="text-sm font-medium mb-2 block">夹角 ∠A = ∠D: {angleA}°</label>
              <Slider
                value={[angleA]}
                onValueChange={(value) => setAngleA(value[0])}
                min={30}
                max={120}
                step={5}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">边 AC = 边 DF: {sideAC}</label>
              <Slider
                value={[sideAC]}
                onValueChange={(value) => setSideAC(value[0])}
                min={60}
                max={150}
                step={5}
                className="w-full"
              />
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">
                AB = DE, ∠A = ∠D, AC = DF → △ABC ≅ △DEF
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

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-start gap-2">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-1">注意：角必须是两边夹角</p>
            <p className="text-gray-600 dark:text-gray-400">
              如果是 SSA（两边及其中一边的对角），不能保证全等
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ASA 判定演示
function ASADemo() {
  const [angleA, setAngleA] = useState(50);
  const [sideAB, setSideAB] = useState(100);
  const [angleB, setAngleB] = useState(60);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawTriangles();
  }, [angleA, sideAB, angleB]);

  const drawTriangles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制第一个三角形
    drawTriangle(ctx, 100, 150, angleA, sideAB, angleB, '#22C55E', '△ABC');

    // 绘制第二个三角形
    drawTriangle(ctx, 300, 150, angleA, sideAB, angleB, '#3B82F6', '△DEF');
  };

  const drawTriangle = (
    ctx: CanvasRenderingContext2D,
    offsetX: number,
    offsetY: number,
    angle1: number,
    side: number,
    angle2: number,
    color: string,
    label: string
  ) => {
    const centerX = offsetX;
    const centerY = offsetY;
    const scale = 0.8;

    const rad1 = (angle1 * Math.PI) / 180;
    const rad2 = (angle2 * Math.PI) / 180;

    const x1 = centerX;
    const y1 = centerY + 80;
    const x2 = centerX + side * scale;
    const y2 = centerY + 80;

    const x3 = x1 + side * scale * Math.cos(rad1);
    const y3 = y1 - side * scale * Math.sin(rad1);

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

    // 标注
    ctx.font = '12px Arial';
    ctx.fillStyle = color;
    ctx.fillText(`${side}`, (x1 + x2) / 2 - 10, (y1 + y2) / 2 - 10);
    ctx.fillText(`${angle1}°`, x1 - 30, y1 - 10);
    ctx.fillText(`${angle2}°`, x2 + 10, y2 - 10);

    ctx.font = 'bold 14px Arial';
    ctx.fillText(label, centerX - 30, centerY - 100);
  };

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">ASA 判定定理</CardTitle>
        <CardDescription>
          两角及其夹边对应相等的两个三角形全等
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">∠A = ∠D: {angleA}°</label>
              <Slider
                value={[angleA]}
                onValueChange={(value) => setAngleA(value[0])}
                min={30}
                max={80}
                step={5}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">边 AB = 边 DE: {sideAB}</label>
              <Slider
                value={[sideAB]}
                onValueChange={(value) => setSideAB(value[0])}
                min={80}
                max={150}
                step={5}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">∠B = ∠E: {angleB}°</label>
              <Slider
                value={[angleB]}
                onValueChange={(value) => setAngleB(value[0])}
                min={30}
                max={80}
                step={5}
                className="w-full"
              />
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">
                ∠A = ∠D, AB = DE, ∠B = ∠E → △ABC ≅ △DEF
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

// AAS 判定演示
function AASDemo() {
  const [angleA, setAngleA] = useState(50);
  const [angleB, setAngleB] = useState(60);
  const [sideBC, setSideBC] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawTriangles();
  }, [angleA, angleB, sideBC]);

  const drawTriangles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const angleC = 180 - angleA - angleB;

    // 绘制第一个三角形
    drawTriangle(ctx, 100, 150, angleA, angleB, sideBC, '#22C55E', '△ABC');

    // 绘制第二个三角形
    drawTriangle(ctx, 300, 150, angleA, angleB, sideBC, '#3B82F6', '△DEF');
  };

  const drawTriangle = (
    ctx: CanvasRenderingContext2D,
    offsetX: number,
    offsetY: number,
    angle1: number,
    angle2: number,
    side: number,
    color: string,
    label: string
  ) => {
    const centerX = offsetX;
    const centerY = offsetY;
    const scale = 0.8;

    const rad1 = (angle1 * Math.PI) / 180;
    const rad2 = (angle2 * Math.PI) / 180;

    const x1 = centerX;
    const y1 = centerY + 80;
    const x2 = centerX + side * scale;
    const y2 = centerY + 80;

    const x3 = x1 + side * scale * Math.cos(rad1);
    const y3 = y1 - side * scale * Math.sin(rad1);

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

    // 标注
    ctx.font = '12px Arial';
    ctx.fillStyle = color;
    ctx.fillText(`${side}`, (x1 + x2) / 2 - 10, (y1 + y2) / 2 - 10);
    ctx.fillText(`${angle1}°`, x1 - 30, y1 - 10);
    ctx.fillText(`${angle2}°`, x2 + 10, y2 - 10);

    ctx.font = 'bold 14px Arial';
    ctx.fillText(label, centerX - 30, centerY - 100);
  };

  const angleC = 180 - angleA - angleB;

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">AAS 判定定理</CardTitle>
        <CardDescription>
          两角及其中一角的对边对应相等的两个三角形全等
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">∠A = ∠D: {angleA}°</label>
              <Slider
                value={[angleA]}
                onValueChange={(value) => setAngleA(value[0])}
                min={30}
                max={80}
                step={5}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">∠B = ∠E: {angleB}°</label>
              <Slider
                value={[angleB]}
                onValueChange={(value) => setAngleB(value[0])}
                min={30}
                max={80}
                step={5}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">边 BC = 边 EF: {sideBC}</label>
              <Slider
                value={[sideBC]}
                onValueChange={(value) => setSideBC(value[0])}
                min={80}
                max={150}
                step={5}
                className="w-full"
              />
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">
                  ∠A = ∠D, ∠B = ∠E, BC = EF → △ABC ≅ △DEF
                </span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                注：∠C = ∠F = {angleC}°（由内角和定理推出）
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
      </CardContent>
    </Card>
  );
}

// HL 判定演示（直角三角形）
function HLDemo() {
  const [hypotenuse, setHypotenuse] = useState(120);
  const [leg, setLeg] = useState(80);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawTriangles();
  }, [hypotenuse, leg]);

  const drawTriangles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const valid = leg < hypotenuse;

    // 绘制第一个三角形
    if (valid) {
      drawTriangle(ctx, 100, 150, hypotenuse, leg, '#22C55E', '△ABC');
      drawTriangle(ctx, 300, 150, hypotenuse, leg, '#3B82F6', '△DEF');
    } else {
      ctx.font = '18px Arial';
      ctx.fillStyle = '#EF4444';
      ctx.textAlign = 'center';
      ctx.fillText('直角边必须小于斜边！', canvas.width / 2, canvas.height / 2);
    }
  };

  const drawTriangle = (
    ctx: CanvasRenderingContext2D,
    offsetX: number,
    offsetY: number,
    hyp: number,
    leg: number,
    color: string,
    label: string
  ) => {
    const centerX = offsetX;
    const centerY = offsetY;
    const scale = 0.8;

    const hypScaled = hyp * scale;
    const legScaled = leg * scale;

    // 计算另一条直角边
    const leg2 = Math.sqrt(hypScaled * hypScaled - legScaled * legScaled);

    const x1 = centerX;
    const y1 = centerY + 80;
    const x2 = centerX + legScaled;
    const y2 = centerY + 80;
    const x3 = centerX;
    const y3 = centerY + 80 - leg2;

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

    // 绘制直角标记
    ctx.beginPath();
    ctx.moveTo(x1 + 15, y1);
    ctx.lineTo(x1 + 15, y1 - 15);
    ctx.lineTo(x1, y1 - 15);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 标注
    ctx.font = '12px Arial';
    ctx.fillStyle = color;
    ctx.fillText(`${leg}`, (x1 + x2) / 2 - 10, (y1 + y2) / 2 - 10);
    ctx.fillText(`${hyp}`, (x2 + x3) / 2 + 10, (y2 + y3) / 2);

    ctx.font = 'bold 14px Arial';
    ctx.fillText(label, centerX - 30, centerY - 100);
  };

  const valid = leg < hypotenuse;

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">HL 判定定理（直角三角形专用）</CardTitle>
        <CardDescription>
          斜边和一条直角边对应相等的两个直角三角形全等
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">斜边: {hypotenuse}</label>
              <Slider
                value={[hypotenuse]}
                onValueChange={(value) => setHypotenuse(value[0])}
                min={90}
                max={180}
                step={5}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">直角边: {leg}</label>
              <Slider
                value={[leg]}
                onValueChange={(value) => setLeg(value[0])}
                min={40}
                max={130}
                step={5}
                className="w-full"
              />
            </div>

            {valid ? (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">
                  斜边 = {hypotenuse}, 直角边 = {leg} → △ABC ≅ △DEF
                </span>
              </div>
            ) : (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium">
                  直角边必须小于斜边
                </span>
              </div>
            )}
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

        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-start gap-2">
          <Info className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-1">HL 定理的证明思路</p>
            <p className="text-gray-600 dark:text-gray-400">
              利用勾股定理，如果两直角三角形的斜边和一条直角边对应相等，
              则另一条直角边也必然相等，从而满足 SAS 判定条件。
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
