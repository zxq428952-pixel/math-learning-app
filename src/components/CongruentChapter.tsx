'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Scale, CheckCircle2, XCircle, Info } from 'lucide-react';

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
          <TabsTrigger value="sss" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">SSS</TabsTrigger>
          <TabsTrigger value="sas" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">SAS</TabsTrigger>
          <TabsTrigger value="asa" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">ASA</TabsTrigger>
          <TabsTrigger value="aas" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">AAS</TabsTrigger>
          <TabsTrigger value="hl" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">HL</TabsTrigger>
          <TabsTrigger value="practice" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">练习题</TabsTrigger>
        </TabsList>

        <TabsContent value="sss"><SSSDemo /></TabsContent>
        <TabsContent value="sas"><SASDemo /></TabsContent>
        <TabsContent value="asa"><ASADemo /></TabsContent>
        <TabsContent value="aas"><AASDemo /></TabsContent>
        <TabsContent value="hl"><HLDemo /></TabsContent>
        <TabsContent value="practice"><CongruentPractice /></TabsContent>
      </Tabs>

      <Card className="bg-white/90 dark:bg-gray-800/90">
        <CardHeader>
          <CardTitle className="text-lg">判定定理记忆口诀</CardTitle>
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

function SSSDemo() {
  const [sideAB, setSideAB] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const drawTriangle = (offsetX: number, color: string) => {
      const scale = 0.8;
      const a = sideAB * scale;
      const b = sideAB * scale;
      const c = sideAB * scale;
      
      const angle1 = Math.acos((b*b + c*c - a*a) / (2*b*c));
      const x1 = offsetX, y1 = 150 + 80;
      const x2 = offsetX + b * Math.cos(angle1), y2 = 150 + 80 - b * Math.sin(angle1);
      const x3 = offsetX + c, y3 = 150 + 80;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3);
      ctx.closePath();
      ctx.fillStyle = color.replace(')', ', 0.2)');
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.stroke();
    };
    
    drawTriangle(100, 'rgb(34, 197, 94)');
    drawTriangle(300, 'rgb(59, 130, 246)');
  }, [sideAB]);

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">SSS 判定定理</CardTitle>
        <CardDescription>三边对应相等的两个三角形全等</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium mb-2 block">边 AB = 边 DE: {sideAB}</label>
            <Slider value={[sideAB]} onValueChange={(v) => setSideAB(v[0])} min={60} max={150} step={5} className="w-full" />
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">AB = DE, BC = EF, CA = FD → △ABC ≅ △DEF</span>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <canvas ref={canvasRef} width={400} height={300} className="w-full bg-white dark:bg-gray-800 rounded-lg" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SASDemo() {
  const [sideAB, setSideAB] = useState(100);
  const [angleA, setAngleA] = useState(60);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const drawTriangle = (offsetX: number, color: string) => {
      const scale = 0.8;
      const rad = (angleA * Math.PI) / 180;
      const x1 = offsetX, y1 = 150 + 80;
      const x2 = offsetX + sideAB * scale, y2 = 150 + 80;
      const x3 = offsetX + sideAB * scale * Math.cos(rad), y3 = 150 + 80 - sideAB * scale * Math.sin(rad);
      
      ctx.beginPath();
      ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3);
      ctx.closePath();
      ctx.fillStyle = color.replace(')', ', 0.2)');
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.stroke();
    };
    
    drawTriangle(100, 'rgb(34, 197, 94)');
    drawTriangle(300, 'rgb(59, 130, 246)');
  }, [sideAB, angleA]);

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">SAS 判定定理</CardTitle>
        <CardDescription>两边及其夹角对应相等的两个三角形全等</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">边 AB = 边 DE: {sideAB}</label>
              <Slider value={[sideAB]} onValueChange={(v) => setSideAB(v[0])} min={60} max={150} step={5} className="w-full" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">夹角 ∠A = ∠D: {angleA}°</label>
              <Slider value={[angleA]} onValueChange={(v) => setAngleA(v[0])} min={30} max={120} step={5} className="w-full" />
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">AB = DE, ∠A = ∠D, AC = DF → △ABC ≅ △DEF</span>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <canvas ref={canvasRef} width={400} height={300} className="w-full bg-white dark:bg-gray-800 rounded-lg" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ASADemo() {
  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader><CardTitle className="text-lg">ASA 判定定理</CardTitle><CardDescription>两角及其夹边对应相等</CardDescription></CardHeader>
      <CardContent>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm">∠A = ∠D, AB = DE, ∠B = ∠E → △ABC ≅ △DEF</p>
        </div>
      </CardContent>
    </Card>
  );
}

function AASDemo() {
  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader><CardTitle className="text-lg">AAS 判定定理</CardTitle><CardDescription>两角及其中一角的对边对应相等</CardDescription></CardHeader>
      <CardContent>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm">∠A = ∠D, ∠B = ∠E, BC = EF → △ABC ≅ △DEF</p>
        </div>
      </CardContent>
    </Card>
  );
}

function HLDemo() {
  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader><CardTitle className="text-lg">HL 判定定理（直角三角形）</CardTitle><CardDescription>斜边和一直角边对应相等</CardDescription></CardHeader>
      <CardContent>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm">斜边 = {120}, 直角边 = {80} → △ABC ≅ △DEF</p>
        </div>
        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-start gap-2">
          <Info className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-1">HL 定理的证明思路</p>
            <p className="text-gray-600 dark:text-gray-400">利用勾股定理，如果两直角三角形的斜边和一条直角边对应相等，则另一条直角边也必然相等，从而满足 SAS 判定条件。</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CongruentPractice() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const questions = [
    {
      question: "已知△ABC和△DEF中，AB=DE，AC=DF，BC=EF，则△ABC≅△DEF的依据是？",
      options: ["SSS", "SAS", "ASA", "AAS"],
      correctAnswer: 0,
      explanation: "三边对应相等，根据 SSS 判定定理，两三角形全等。"
    },
    {
      question: "在△ABC和△DEF中，AB=DE，∠A=∠D，AC=DF，则△ABC≅△DEF的依据是？",
      options: ["SSS", "SAS", "ASA", "AAS"],
      correctAnswer: 1,
      explanation: "两边及其夹角对应相等，根据 SAS 判定定理，两三角形全等。"
    },
    {
      question: "以下哪个条件不能判定两个三角形全等？",
      options: ["三边对应相等", "两边及其中一边的对角对应相等", "两角及夹边对应相等", "斜边和一直角边对应相等（直角三角形）"],
      correctAnswer: 1,
      explanation: "两边及其中一边的对角对应相等（SSA）不能判定三角形全等，这是常见的陷阱。"
    },
    {
      question: "在Rt△ABC和Rt△DEF中，斜边AB=斜边DE，直角边AC=直角边DF，则△ABC≅△DEF的依据是？",
      options: ["SSS", "SAS", "HL", "ASA"],
      correctAnswer: 2,
      explanation: "直角三角形中，斜边和一条直角边对应相等，根据 HL 定理，两直角三角形全等。"
    },
    {
      question: "已知△ABC中，AB=AC，AD是角平分线，则△ABD≌△ACD的依据是？",
      options: ["SSS", "SAS", "ASA", "HL"],
      correctAnswer: 1,
      explanation: "AB=AC（已知），∠BAD=∠CAD（AD是角平分线），AD=AD（公共边），根据 SAS 判定定理，两三角形全等。"
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
        <CardTitle className="text-lg">全等三角形练习题</CardTitle>
        <CardDescription>巩固判定定理，提高证明能力</CardDescription>
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
