'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BarChart3, Info, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';

export function DataAnalysisChapter() {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-cyan-200 dark:border-cyan-800 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-cyan-600" />
            数据的分析
          </CardTitle>
          <CardDescription>
            学习平均数、中位数、众数、方差、标准差等统计概念
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="central" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <TabsTrigger value="central" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
            集中趋势
          </TabsTrigger>
          <TabsTrigger value="dispersion" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
            离散程度
          </TabsTrigger>
          <TabsTrigger value="frequency" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
            频数分布
          </TabsTrigger>
          <TabsTrigger value="practice" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
            练习题
          </TabsTrigger>
        </TabsList>

        <TabsContent value="central">
          <CentralTendency />
        </TabsContent>

        <TabsContent value="dispersion">
          <Dispersion />
        </TabsContent>

        <TabsContent value="frequency">
          <FrequencyDistribution />
        </TabsContent>

        <TabsContent value="practice">
          <DataAnalysisPractice />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// 集中趋势组件
function CentralTendency() {
  const [data, setData] = useState([3, 5, 7, 8, 5, 9, 5, 6, 7, 5]);
  const [inputData, setInputData] = useState('3,5,7,8,5,9,5,6,7,5');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mean = (data.reduce((a, b) => a + b, 0) / data.length).toFixed(2);
  const sortedData = [...data].sort((a, b) => a - b);
  const median = data.length % 2 === 0
    ? ((sortedData[data.length / 2 - 1] + sortedData[data.length / 2]) / 2).toFixed(2)
    : sortedData[Math.floor(data.length / 2)].toFixed(2);

  const mode = data.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const maxFreq = Math.max(...Object.values(mode));
  const modes = Object.keys(mode).filter(k => mode[Number(k)] === maxFreq).map(Number);

  useEffect(() => {
    drawChart();
  }, [data]);

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const padding = 50;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    // 绘制坐标轴
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // 计算频数
    const freq: Record<number, number> = {};
    data.forEach(v => freq[v] = (freq[v] || 0) + 1);
    const values = Object.keys(freq).map(Number).sort((a, b) => a - b);
    const maxFreqVal = Math.max(...Object.values(freq));

    // 绘制柱状图
    const barWidth = chartWidth / values.length - 10;
    values.forEach((value, index) => {
      const barHeight = (freq[value] / maxFreqVal) * chartHeight;
      const x = padding + 10 + index * (barWidth + 10);
      const y = canvas.height - padding - barHeight;

      ctx.fillStyle = '#06B6D4';
      ctx.fillRect(x, y, barWidth, barHeight);

      ctx.strokeStyle = '#0891B2';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, barWidth, barHeight);

      // 标签
      ctx.font = '12px Arial';
      ctx.fillStyle = '#374151';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + barWidth / 2, canvas.height - padding + 20);
      ctx.fillText(freq[value].toString(), x + barWidth / 2, y - 5);
    });
  };

  const handleUpdateData = () => {
    const newData = inputData.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
    if (newData.length > 0) {
      setData(newData);
    }
  };

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">集中趋势的度量</CardTitle>
        <CardDescription>平均数、中位数、众数</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">输入数据（用逗号分隔）</label>
              <Input
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="例如: 3,5,7,8,5,9"
              />
              <Button onClick={handleUpdateData} className="mt-2 w-full">更新数据</Button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">平均数</div>
                <div className="font-bold text-blue-600">{mean}</div>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">中位数</div>
                <div className="font-bold text-green-600">{median}</div>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">众数</div>
                <div className="font-bold text-purple-600">{modes.join(',')}</div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3 text-sm">
              <div className="font-semibold mb-2">数据统计</div>
              <div className="flex justify-between">
                <span>数据个数：</span>
                <span className="font-mono">{data.length}</span>
              </div>
              <div className="flex justify-between">
                <span>数据总和：</span>
                <span className="font-mono">{data.reduce((a, b) => a + b, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>最小值：</span>
                <span className="font-mono">{Math.min(...data)}</span>
              </div>
              <div className="flex justify-between">
                <span>最大值：</span>
                <span className="font-mono">{Math.max(...data)}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <canvas ref={canvasRef} width={400} height={300} className="w-full bg-white dark:bg-gray-800 rounded-lg" />
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              平均数
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              所有数据的总和除以数据的个数，反映数据的整体水平。
            </p>
            <div className="mt-2 font-mono text-xs">
              x̄ = (x₁ + x₂ + ... + xₙ) / n
            </div>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              中位数
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              将数据按大小顺序排列，位于中间位置的数，不受极端值影响。
            </p>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              众数
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              数据中出现次数最多的数，可能有一个或多个，也可能没有。
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 离散程度组件
function Dispersion() {
  const [data, setData] = useState([10, 12, 14, 15, 18, 20, 22]);
  const [inputData, setInputData] = useState('10,12,14,15,18,20,22');

  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const squaredDiffs = data.map(v => Math.pow(v - mean, 2));
  const variance = squaredDiffs.reduce((a, b) => a + b, 0) / data.length;
  const stdDev = Math.sqrt(variance);
  const range = Math.max(...data) - Math.min(...data);

  const handleUpdateData = () => {
    const newData = inputData.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
    if (newData.length > 0) {
      setData(newData);
    }
  };

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">离散程度的度量</CardTitle>
        <CardDescription>方差与标准差</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">输入数据（用逗号分隔）</label>
              <Input
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="例如: 10,12,14,15,18,20,22"
              />
              <Button onClick={handleUpdateData} className="mt-2 w-full">更新数据</Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">平均数</div>
                <div className="font-bold text-orange-600">{mean.toFixed(2)}</div>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">极差</div>
                <div className="font-bold text-red-600">{range}</div>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">方差</div>
                <div className="font-bold text-blue-600">{variance.toFixed(2)}</div>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">标准差</div>
                <div className="font-bold text-green-600">{stdDev.toFixed(2)}</div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2 text-sm">
              <div className="font-semibold mb-2">计算过程</div>
              <div className="font-mono text-xs">
                平均数 x̄ = {mean.toFixed(2)}
              </div>
              <div className="font-mono text-xs">
                方差 s² = Σ(xᵢ - x̄)² / n = {variance.toFixed(2)}
              </div>
              <div className="font-mono text-xs">
                标准差 s = √s² = {stdDev.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold mb-3">方差与标准差</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                方差和标准差用来衡量数据的离散程度（波动大小）。
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Badge className="bg-blue-500 mt-0.5">方差</Badge>
                  <div className="text-sm">
                    <p>各数据与平均数的差的平方的平均数</p>
                    <p className="font-mono text-xs mt-1">s² = Σ(xᵢ - x̄)² / n</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Badge className="bg-green-500 mt-0.5">标准差</Badge>
                  <div className="text-sm">
                    <p>方差的算术平方根，与原始数据单位相同</p>
                    <p className="font-mono text-xs mt-1">s = √s²</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold mb-3">极差</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                极差 = 最大值 - 最小值 = {range}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                极差是最简单的离散程度指标，但容易受极端值影响。
              </p>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-start gap-2">
              <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-2">应用提示</p>
                <p className="text-gray-600 dark:text-gray-400">
                  标准差越小，说明数据越集中，波动越小；标准差越大，说明数据越分散，波动越大。
                  在质量控制、风险管理等领域广泛应用。
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 频数分布组件
function FrequencyDistribution() {
  const [data, setData] = useState([65, 72, 68, 75, 80, 82, 70, 73, 78, 85, 88, 90, 76, 79, 83]);
  const [inputData, setInputData] = useState('65,72,68,75,80,82,70,73,78,85,88,90,76,79,83');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  const groupCount = 5;
  const groupWidth = Math.ceil(range / groupCount);

  const groups: Array<{ min: number; max: number; count: number }> = [];
  for (let i = 0; i < groupCount; i++) {
    const groupMin = min + i * groupWidth;
    const groupMax = groupMin + groupWidth;
    const count = data.filter(v => v >= groupMin && v < (i === groupCount - 1 ? groupMax + 1 : groupMax)).length;
    groups.push({ min: groupMin, max: i === groupCount - 1 ? groupMax : groupMax - 1, count });
  }

  useEffect(() => {
    drawHistogram();
  }, [data]);

  const drawHistogram = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const padding = 50;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    // 绘制坐标轴
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    const maxCount = Math.max(...groups.map(g => g.count));
    const barWidth = chartWidth / groups.length - 10;

    groups.forEach((group, index) => {
      const barHeight = (group.count / maxCount) * chartHeight;
      const x = padding + 10 + index * (barWidth + 10);
      const y = canvas.height - padding - barHeight;

      ctx.fillStyle = '#06B6D4';
      ctx.fillRect(x, y, barWidth, barHeight);

      ctx.strokeStyle = '#0891B2';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, barWidth, barHeight);

      // 标签
      ctx.font = '10px Arial';
      ctx.fillStyle = '#374151';
      ctx.textAlign = 'center';
      ctx.fillText(`${group.min}-${group.max}`, x + barWidth / 2, canvas.height - padding + 20);
      ctx.font = '12px Arial';
      ctx.fillText(group.count.toString(), x + barWidth / 2, y - 5);
    });
  };

  const handleUpdateData = () => {
    const newData = inputData.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
    if (newData.length > 0) {
      setData(newData);
    }
  };

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90">
      <CardHeader>
        <CardTitle className="text-lg">频数分布</CardTitle>
        <CardDescription>数据的分组与频数统计</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">输入数据（用逗号分隔）</label>
              <Input
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="例如: 65,72,68,75,80,82,70"
              />
              <Button onClick={handleUpdateData} className="mt-2 w-full">更新数据</Button>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-semibold mb-3">分组信息</h4>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>数据范围：</span>
                  <span className="font-mono">{min} - {max}</span>
                </div>
                <div className="flex justify-between">
                  <span>极差：</span>
                  <span className="font-mono">{range}</span>
                </div>
                <div className="flex justify-between">
                  <span>分组数：</span>
                  <span className="font-mono">{groupCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>组距：</span>
                  <span className="font-mono">{groupWidth}</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">分组</th>
                    <th className="text-center py-2">频数</th>
                    <th className="text-center py-2">频率</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map((group, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 font-mono">{group.min} - {group.max}</td>
                      <td className="text-center py-2">{group.count}</td>
                      <td className="text-center py-2">{(group.count / data.length * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <canvas ref={canvasRef} width={400} height={350} className="w-full bg-white dark:bg-gray-800 rounded-lg" />
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-start gap-2">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-2">频数分布表</p>
            <p className="text-gray-600 dark:text-gray-400">
              频数分布表是将数据按一定标准分成若干组，统计各组内数据的个数（频数）。
              通过频数分布可以更清晰地了解数据的分布特征。频率 = 频数 / 数据总数 × 100%。
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 练习题组件
function DataAnalysisPractice() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const questions = [
    {
      question: "数据 2, 4, 6, 8, 10 的平均数是？",
      options: ["5", "6", "6.5", "7"],
      correctAnswer: 1,
      explanation: "平均数 = (2 + 4 + 6 + 8 + 10) / 5 = 30 / 5 = 6。"
    },
    {
      question: "数据 3, 7, 8, 5, 6 的中位数是？",
      options: ["5", "6", "7", "8"],
      correctAnswer: 1,
      explanation: "排序后为 3, 5, 6, 7, 8，位于中间的数是 6。"
    },
    {
      question: "数据 2, 3, 5, 5, 7, 5, 8 的众数是？",
      options: ["2", "5", "7", "8"],
      correctAnswer: 1,
      explanation: "5 出现了 3 次，是出现次数最多的数，因此众数是 5。"
    },
    {
      question: "数据 1, 2, 3, 4, 5 的方差是？",
      options: ["1", "2", "2.5", "√2"],
      correctAnswer: 1,
      explanation: "平均数 = 3，方差 = [(1-3)²+(2-3)²+(3-3)²+(4-3)²+(5-3)²]/5 = (4+1+0+1+4)/5 = 10/5 = 2。"
    },
    {
      question: "某班 50 名学生考试，平均分 80 分，则总分是？",
      options: ["4000", "400", "80", "无法确定"],
      correctAnswer: 0,
      explanation: "总分 = 平均分 × 人数 = 80 × 50 = 4000 分。"
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
        <CardTitle className="text-lg">数据的分析练习题</CardTitle>
        <CardDescription>巩固统计概念的理解</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {currentQuestion < questions.length ? (
            <>
              <div className="flex justify-between items-center">
                <Badge className="bg-cyan-500">第 {currentQuestion + 1} / {questions.length} 题</Badge>
                <Badge className="bg-green-500">正确率: {correctCount}/{currentQuestion + (showResult ? 1 : 0)}</Badge>
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
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
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
