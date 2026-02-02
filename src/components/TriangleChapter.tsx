'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Triangle, Info, AlertCircle, CheckCircle2, XCircle, BookOpen } from 'lucide-react';

export function TriangleChapter() {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200 dark:border-blue-800 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Triangle className="h-6 w-6 text-blue-600" />
            三角形 - 几何基石
          </CardTitle>
          <CardDescription>
            通过交互式图形深入理解三边关系、内角和、外角定理
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="sides" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <TabsTrigger 
            value="sides"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            三边关系
          </TabsTrigger>
          <TabsTrigger 
            value="angles"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            内角和
          </TabsTrigger>
          <TabsTrigger 
            value="exterior"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            外角定理
          </TabsTrigger>
          <TabsTrigger 
            value="practice"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            练习题
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sides">
          <TriangleSidesDemo />
        </TabsContent>

        <TabsContent value="angles">
          <TriangleAnglesDemo />
        </TabsContent>

        <TabsContent value="exterior">
          <TriangleExteriorDemo />
        </TabsContent>

        <TabsContent value="practice">
          <TrianglePractice />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// 三边关系演示组件
function TriangleSidesDemo() {
  const [sideA, setSideA] = useState(150);
  const [sideB, setSideB] = useState(150);
  const [sideC, setSideC] = useState(150);
  const [animating, setAnimating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawTriangle();
  }, [sideA, sideB, sideC, animating]);

  const drawTriangle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const a = sideA;
    const b = sideB;
    const c = sideC;

    const canForm = (a + b > c) && (b + c > a) && (a + c > b);

    if (canForm) {
      const angle1 = Math.acos((b * b + c * c - a * a) / (2 * b * c));
      const scale = 0.8;
      const x1 = centerX;
      const y1 = centerY + 100;
      const x2 = centerX + b * scale * Math.cos(angle1);
      const y2 = centerY + 100 - b * scale * Math.sin(angle1);
      const x3 = centerX + c * scale;
      const y3 = centerY + 100;

      // 绘制三角形
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.closePath();

      ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.fill();

      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 3;
      ctx.stroke();

      // 标注边长
      ctx.font = '14px Arial';
      ctx.fillStyle = '#1E40AF';
      ctx.fillText(`a = ${a}`, (x2 + x3) / 2 - 20, (y2 + y3) / 2 - 10);
      ctx.fillText(`b = ${b}`, (x1 + x2) / 2 - 20, (y1 + y2) / 2 - 10);
      ctx.fillText(`c = ${c}`, (x1 + x3) / 2 + 10, (y1 + y3) / 2 + 20);
    } else {
      ctx.font = '18px Arial';
      ctx.fillStyle = '#EF4444';
      ctx.textAlign = 'center';
      ctx.fillText('无法构成三角形！', centerX, centerY);
      ctx.font = '14px Arial';
      ctx.fillText('请调整边长，满足两边之和 > 第三边', centerX, centerY + 30);
    }
  };

  const canForm = (sideA + sideB > sideC) && (sideB + sideC > sideA) && (sideA + sideC > sideB);

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">三边关系定理</CardTitle>
        <CardDescription>
          口诀："大（边）孤独，小（边）团结" - 最长边必须小于两边之和
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="font-medium mb-2 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                定理讲解
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                三角形任意两边之和大于第三边，任意两边之差小于第三边。
                这是因为两点之间线段最短，如果两边之和等于或小于第三边，
                就无法构成封闭图形。
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">边 a: {sideA}</label>
              <Slider
                value={[sideA]}
                onValueChange={(value) => setSideA(value[0])}
                min={50}
                max={250}
                step={5}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">边 b: {sideB}</label>
              <Slider
                value={[sideB]}
                onValueChange={(value) => setSideB(value[0])}
                min={50}
                max={250}
                step={5}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">边 c: {sideC}</label>
              <Slider
                value={[sideC]}
                onValueChange={(value) => setSideC(value[0])}
                min={50}
                max={250}
                step={5}
                className="w-full"
              />
            </div>

            <div className={`p-4 rounded-lg ${canForm ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
              <div className="flex items-start gap-2">
                {canForm ? (
                  <Badge variant="default" className="bg-green-500">✓ 可以构成三角形</Badge>
                ) : (
                  <Badge variant="destructive">✗ 无法构成三角形</Badge>
                )}
              </div>
              <div className="mt-2 space-y-1 text-sm">
                <p>a + b = {sideA + sideB} {sideA + sideB > sideC ? '>' : '<='} c ({sideC})</p>
                <p>b + c = {sideB + sideC} {sideB + sideC > sideA ? '>' : '<='} a ({sideA})</p>
                <p>a + c = {sideA + sideC} {sideA + sideC > sideB ? '>' : '<='} b ({sideB})</p>
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

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-2">记忆方法：</p>
              <p className="text-gray-600 dark:text-gray-400">
                想象三根木棍，任何两根的长度加起来必须比第三根长，否则无法首尾相接形成三角形。
                自己动手画10遍三角形，标出边长关系，形成视觉记忆。
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 内角和演示组件
function TriangleAnglesDemo() {
  const [angleA, setAngleA] = useState(60);
  const [angleB, setAngleB] = useState(60);
  const [angleC, setAngleC] = useState(60);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawTriangle();
  }, [angleA, angleB, angleC]);

  const drawTriangle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const size = 100;

    const radA = (angleA * Math.PI) / 180;
    const radB = (angleB * Math.PI) / 180;
    const radC = (angleC * Math.PI) / 180;

    const x1 = centerX;
    const y1 = centerY - size;

    const x2 = centerX + size * Math.cos(radB);
    const y2 = centerY + size * Math.sin(radB);

    const x3 = centerX - size * Math.cos(radC);
    const y3 = centerY + size * Math.sin(radC);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();

    ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
    ctx.fill();

    ctx.strokeStyle = '#22C55E';
    ctx.lineWidth = 3;
    ctx.stroke();

    drawAngleArc(ctx, x1, y1, x3, x2, 40, `${angleA}°`);
    drawAngleArc(ctx, x2, y2, x1, x3, 40, `${angleB}°`);
    drawAngleArc(ctx, x3, y3, x2, x1, 40, `${angleC}°`);
  };

  const drawAngleArc = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    x1: number,
    x2: number,
    radius: number,
    label: string
  ) => {
    const startAngle = Math.atan2(y - x1, x - x1);
    const endAngle = Math.atan2(y - x2, x - x2);

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.strokeStyle = '#16A34A';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = '12px Arial';
    ctx.fillStyle = '#166534';
    ctx.textAlign = 'center';
    ctx.fillText(label, x + Math.cos((startAngle + endAngle) / 2) * (radius + 15), y + Math.sin((startAngle + endAngle) / 2) * (radius + 15));
  };

  const sum = angleA + angleB + angleC;

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">内角和定理</CardTitle>
        <CardDescription>
          三角形三个内角之和等于 180°
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="font-medium mb-2 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                定理讲解
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                在任意三角形中，三个内角的度数之和总是等于180度。
                这个定理是几何学的基础，可以用来计算未知角度或验证三角形。
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">∠A: {angleA}°</label>
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
              <label className="text-sm font-medium mb-2 block">∠B: {angleB}°</label>
              <Slider
                value={[angleB]}
                onValueChange={(value) => setAngleB(value[0])}
                min={30}
                max={120}
                step={5}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">∠C: {angleC}°</label>
              <Slider
                value={[angleC]}
                onValueChange={(value) => setAngleC(value[0])}
                min={30}
                max={120}
                step={5}
                className="w-full"
              />
            </div>

            <div className={`p-4 rounded-lg ${sum === 180 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20'}`}>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">
                  ∠A + ∠B + ∠C = <span className={sum === 180 ? 'text-green-600' : 'text-yellow-600'}>{sum}°</span>
                </div>
                {sum === 180 ? (
                  <Badge className="bg-green-500">✓ 满足 180°</Badge>
                ) : (
                  <Badge className="bg-yellow-500">⚠ 需要等于 180°</Badge>
                )}
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

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-2">证明思路：</p>
              <p className="text-gray-600 dark:text-gray-400">
                过三角形的一个顶点作对边的平行线，利用平行线的性质，可以将三角形三个内角"拼"成一条直线，从而证明内角和为180°。
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 外角定理演示组件
function TriangleExteriorDemo() {
  const [angleA, setAngleA] = useState(50);
  const [angleB, setAngleB] = useState(60);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const angleC = 180 - angleA - angleB;
  const exteriorAngleC = angleA + angleB;

  useEffect(() => {
    drawTriangle();
  }, [angleA, angleB]);

  const drawTriangle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const size = 80;

    const radA = (angleA * Math.PI) / 180;
    const radB = (angleB * Math.PI) / 180;

    const x1 = centerX;
    const y1 = centerY - size;

    const x2 = centerX + size;
    const y2 = centerY + size;

    const x3 = centerX - size * Math.cos(radB);
    const y3 = centerY + size * Math.sin(radB);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();

    ctx.fillStyle = 'rgba(234, 88, 12, 0.2)';
    ctx.fill();

    ctx.strokeStyle = '#EA580C';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 + size * 0.8, y2 + size * 0.8);
    ctx.strokeStyle = '#EA580C';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);

    drawAngleArc(ctx, x1, y1, x3, x2, 30, `${angleA}°`, '#EA580C');
    drawAngleArc(ctx, x3, y3, x2, x1, 30, `${angleB}°`, '#EA580C');
    drawAngleArc(ctx, x2, y2, x1, x3, 30, `${angleC}°`, '#EA580C');

    const extStartAngle = Math.atan2(y2 - x1, x2 - x1);
    const extEndAngle = Math.atan2((y2 + size * 0.8) - y2, (x2 + size * 0.8) - x2);
    
    ctx.beginPath();
    ctx.arc(x2, y2, 40, extStartAngle, extEndAngle);
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = '14px Arial';
    ctx.fillStyle = '#DC2626';
    ctx.textAlign = 'center';
    ctx.fillText('外角', x2 + Math.cos((extStartAngle + extEndAngle) / 2) * 55, y2 + Math.sin((extStartAngle + extEndAngle) / 2) * 55);
  };

  const drawAngleArc = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    x1: number,
    x2: number,
    radius: number,
    label: string,
    color: string
  ) => {
    const startAngle = Math.atan2(y - x1, x - x1);
    const endAngle = Math.atan2(y - x2, x - x2);

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = '12px Arial';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(label, x + Math.cos((startAngle + endAngle) / 2) * (radius + 15), y + Math.sin((startAngle + endAngle) / 2) * (radius + 15));
  };

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">外角定理</CardTitle>
        <CardDescription>
          三角形的一个外角等于与它不相邻的两个内角之和
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="font-medium mb-2 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-orange-600" />
                定理讲解
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                外角定理是计算复杂角度的关键工具。外角等于与之不相邻的两个内角之和，
                这为求解角度问题提供了重要的思路。
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">∠A: {angleA}°</label>
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
              <label className="text-sm font-medium mb-2 block">∠B: {angleB}°</label>
              <Slider
                value={[angleB]}
                onValueChange={(value) => setAngleB(value[0])}
                min={30}
                max={80}
                step={5}
                className="w-full"
              />
            </div>

            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span>∠C = 180° - ∠A - ∠B</span>
                <Badge className="bg-orange-500">{angleC}°</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>外角 = ∠A + ∠B</span>
                <Badge className="bg-red-500">{exteriorAngleC}°</Badge>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="text-center">
                  <span className="font-medium">外角 = 180° - ∠C = </span>
                  <Badge className="bg-green-500">{180 - angleC}°</Badge>
                </div>
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

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-2">应用场景：</p>
              <p className="text-gray-600 dark:text-gray-400">
                "飞镖"和"八字"模型是倒角计算的核心工具。利用外角定理，可以快速求出复杂图形中的角度关系。
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 练习题组件
function TrianglePractice() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const questions = [
    {
      question: "一个三角形的三边长分别为 3, 4, 5，判断是否可以构成三角形？",
      options: ["可以构成", "不可以构成", "无法确定"],
      correctAnswer: 0,
      explanation: "因为 3 + 4 = 7 > 5, 4 + 5 = 9 > 3, 3 + 5 = 8 > 4，满足三边关系定理。"
    },
    {
      question: "一个三角形的两个内角分别是 60° 和 70°，第三个内角是多少度？",
      options: ["40°", "50°", "60°"],
      correctAnswer: 1,
      explanation: "根据内角和定理，第三个角 = 180° - 60° - 70° = 50°。"
    },
    {
      question: "三角形的一个外角是 120°，与之相邻的内角是多少度？",
      options: ["50°", "60°", "70°"],
      correctAnswer: 1,
      explanation: "外角与相邻内角互补，所以相邻内角 = 180° - 120° = 60°。"
    },
    {
      question: "在△ABC中，∠A = 50°，∠B = 60°，则外角∠BCD等于多少度？",
      options: ["100°", "110°", "120°"],
      correctAnswer: 1,
      explanation: "∠C = 180° - 50° - 60° = 70°，外角∠BCD = 180° - 70° = 110°（或直接用外角定理：50° + 60° = 110°）。"
    },
    {
      question: "如果三角形的三边长分别为 a, b, c，且 a > b > c，则以下哪个不等式一定成立？",
      options: ["a + b = c", "a + b < c", "a + b > c"],
      correctAnswer: 2,
      explanation: "根据三边关系定理，任意两边之和大于第三边，所以 a + b > c。"
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
        <CardTitle className="text-lg">三角形练习题</CardTitle>
        <CardDescription>
          巩固所学知识，提升解题能力
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {currentQuestion < questions.length ? (
            <>
              <div className="flex justify-between items-center">
                <Badge className="bg-blue-500">
                  第 {currentQuestion + 1} / {questions.length} 题
                </Badge>
                <Badge className="bg-green-500">
                  正确率: {correctCount}/{currentQuestion + (showResult ? 1 : 0)}
                </Badge>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => !showResult && handleAnswer(index)}
                      variant={selectedAnswer === String(index) 
                        ? (index === currentQ.correctAnswer ? "default" : "destructive")
                        : showResult && index === currentQ.correctAnswer 
                          ? "default" 
                          : "outline"
                      }
                      className={`w-full justify-start text-left h-auto py-3 px-4 ${
                        selectedAnswer === String(index) 
                          ? (index === currentQ.correctAnswer ? "bg-green-500" : "bg-red-500")
                          : showResult && index === currentQ.correctAnswer 
                            ? "bg-green-500" 
                            : ""
                      }`}
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
                    {selectedAnswer === String(currentQ.correctAnswer) ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className="font-medium">
                      {selectedAnswer === String(currentQ.correctAnswer) ? "回答正确！" : "回答错误"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    解析：{currentQ.explanation}
                  </p>
                </div>
              )}

              {showResult && currentQuestion < questions.length - 1 && (
                <Button onClick={nextQuestion} className="w-full">
                  下一题
                </Button>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">练习完成！</h3>
              <p className="text-lg mb-6">
                你答对了 <span className="text-green-600 font-bold">{correctCount}</span> / {questions.length} 题
              </p>
              <Button onClick={resetPractice} size="lg">
                重新练习
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
