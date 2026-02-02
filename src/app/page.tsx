'use client';

'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Triangle, 
  Square, 
  MoveHorizontal, 
  FunctionSquare, 
  Divide, 
  BookOpen,
  TrendingUp,
  Brain,
  Infinity,
  BarChart3,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { PythagorasChapter } from '@/components/PythagorasChapter';
import { RealNumbersChapter } from '@/components/RealNumbersChapter';
import { CoordinateChapter } from '@/components/CoordinateChapter';
import { LinearEquationsChapter } from '@/components/LinearEquationsChapter';
import { DataAnalysisChapter } from '@/components/DataAnalysisChapter';
import { ParallelLinesChapter } from '@/components/ParallelLinesChapter';

export default function MathLearningApp() {
  const [activeTab, setActiveTab] = useState('map');

  // 颜色映射
  const colorClasses: Record<string, string> = {
    blue: 'from-blue-500 to-blue-600 border-blue-200 dark:border-blue-800 hover:shadow-blue-500/30',
    purple: 'from-purple-500 to-purple-600 border-purple-200 dark:border-purple-800 hover:shadow-purple-500/30',
    green: 'from-green-500 to-green-600 border-green-200 dark:border-green-800 hover:shadow-green-500/30',
    red: 'from-red-500 to-red-600 border-red-200 dark:border-red-800 hover:shadow-red-500/30',
    orange: 'from-orange-500 to-orange-600 border-orange-200 dark:border-orange-800 hover:shadow-orange-500/30',
    cyan: 'from-cyan-500 to-cyan-600 border-cyan-200 dark:border-cyan-800 hover:shadow-cyan-500/30',
    indigo: 'from-indigo-500 to-indigo-600 border-indigo-200 dark:border-indigo-800 hover:shadow-indigo-500/30'
  };

  // 广东省北师大版八年级数学上册章节
  const chapters = [
    { id: 'pythagoras', name: '勾股定理', icon: Triangle, color: 'blue', description: '探索直角三角形的奥秘' },
    { id: 'real-numbers', name: '实数', icon: Infinity, color: 'purple', description: '无理数与实数运算' },
    { id: 'coordinates', name: '位置与坐标', icon: MapPin, color: 'green', description: '平面直角坐标系' },
    { id: 'equations', name: '二元一次方程组', icon: FunctionSquare, color: 'orange', description: '方程组的解法与应用' },
    { id: 'statistics', name: '数据的分析', icon: BarChart3, color: 'cyan', description: '平均数、中位数、众数' },
    { id: 'parallel', name: '平行线的证明', icon: MoveHorizontal, color: 'indigo', description: '几何证明与推理' },
  ];

  // 监听来自学习地图的导航事件
  useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      setActiveTab(event.detail);
    };

    window.addEventListener('navigateToTab', handleNavigate as EventListener);
    return () => {
      window.removeEventListener('navigateToTab', handleNavigate as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                <FunctionSquare className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  广东省北师大版八年级数学（上）
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  图形化学习 · 可视化理解 · 系统梳理
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm">
              北师大版上册
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 gap-1 h-auto p-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <TabsTrigger
              value="map"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              学习地图
            </TabsTrigger>
            <TabsTrigger
              value="pythagoras"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <Triangle className="h-4 w-4 mr-2" />
              勾股定理
            </TabsTrigger>
            <TabsTrigger
              value="real-numbers"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <Infinity className="h-4 w-4 mr-2" />
              实数
            </TabsTrigger>
            <TabsTrigger
              value="coordinates"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <MapPin className="h-4 w-4 mr-2" />
              位置与坐标
            </TabsTrigger>
            <TabsTrigger
              value="equations"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <FunctionSquare className="h-4 w-4 mr-2" />
              二元一次方程组
            </TabsTrigger>
            <TabsTrigger
              value="statistics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              数据的分析
            </TabsTrigger>
            <TabsTrigger
              value="parallel"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <MoveHorizontal className="h-4 w-4 mr-2" />
              平行线的证明
            </TabsTrigger>
          </TabsList>

          {/* 学习地图 */}
          <TabsContent value="map" className="space-y-6">
            <Card className="border-2 border-purple-200 dark:border-purple-800 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-6 w-6 text-purple-600" />
                  学习路线图
                </CardTitle>
                <CardDescription>
                  广东省北师大版八年级数学上册核心知识体系
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {chapters.map((chapter) => (
                    <LearningMapCard
                      key={chapter.id}
                      title={chapter.name}
                      description={chapter.description}
                      color={chapter.color}
                      icon={<chapter.icon className="h-8 w-8" />}
                      tabValue={chapter.id}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 勾股定理 */}
          <TabsContent value="pythagoras">
            <PythagorasChapter />
          </TabsContent>

          {/* 实数 */}
          <TabsContent value="real-numbers">
            <RealNumbersChapter />
          </TabsContent>

          {/* 位置与坐标 */}
          <TabsContent value="coordinates">
            <CoordinateChapter />
          </TabsContent>

          {/* 二元一次方程组 */}
          <TabsContent value="equations">
            <LinearEquationsChapter />
          </TabsContent>

          {/* 数据的分析 */}
          <TabsContent value="statistics">
            <DataAnalysisChapter />
          </TabsContent>

          {/* 平行线的证明 */}
          <TabsContent value="parallel">
            <ParallelLinesChapter />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function LearningMapCard({
  title,
  description,
  color,
  icon,
  tabValue
}: {
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  tabValue: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: 'from-blue-500 to-blue-600 border-blue-200 dark:border-blue-800 hover:shadow-blue-500/30',
    green: 'from-green-500 to-green-600 border-green-200 dark:border-green-800 hover:shadow-green-500/30',
    purple: 'from-purple-500 to-purple-600 border-purple-200 dark:border-purple-800 hover:shadow-purple-500/30',
    orange: 'from-orange-500 to-orange-600 border-orange-200 dark:border-orange-800 hover:shadow-orange-500/30',
    cyan: 'from-cyan-500 to-cyan-600 border-cyan-200 dark:border-cyan-800 hover:shadow-cyan-500/30',
    indigo: 'from-indigo-500 to-indigo-600 border-indigo-200 dark:border-indigo-800 hover:shadow-indigo-500/30'
  };

  const gradientClass = colorClasses[color]?.split(' ').slice(0, 2).join(' ') || '';
  const borderClass = colorClasses[color]?.split(' ')[2] || '';
  const shadowClass = colorClasses[color]?.split(' ')[3] || '';

  return (
    <Card
      className={`border-2 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer ${borderClass} bg-white/90 dark:bg-gray-800/90 hover:${shadowClass}`}
      onClick={() => {
        const event = new CustomEvent('navigateToTab', { detail: tabValue });
        window.dispatchEvent(event);
      }}
    >
      <CardHeader>
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white mb-4`}>
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="ghost"
          className="w-full group"
          onClick={() => {
            const event = new CustomEvent('navigateToTab', { detail: tabValue });
            window.dispatchEvent(event);
          }}
        >
          开始学习
          <CheckCircle2 className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}


