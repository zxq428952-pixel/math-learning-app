'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Clock, Brain, BookOpen, CheckCircle2 } from 'lucide-react';

export function StrategyChapter() {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-pink-200 dark:border-pink-800 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-pink-600" />
            提分策略 - 四周逆袭
          </CardTitle>
          <CardDescription>
            错题本2.0、刻意练习、讲题学习法
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="plan" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <TabsTrigger 
            value="plan"
            className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
          >
            四周计划
          </TabsTrigger>
          <TabsTrigger 
            value="methods"
            className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
          >
            学习方法
          </TabsTrigger>
          <TabsTrigger 
            value="exam"
            className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
          >
            考试策略
          </TabsTrigger>
          <TabsTrigger 
            value="motivation"
            className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
          >
            激励与行动
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plan">
          <FourWeekPlan />
        </TabsContent>

        <TabsContent value="methods">
          <LearningMethods />
        </TabsContent>

        <TabsContent value="exam">
          <ExamStrategy />
        </TabsContent>

        <TabsContent value="motivation">
          <MotivationAction />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function FourWeekPlan() {
  return (
    <div className="space-y-4">
      <Card className="bg-white/90 dark:bg-gray-800/90">
        <CardHeader>
          <CardTitle className="text-lg">四周逆袭计划</CardTitle>
          <CardDescription>系统化、分阶段提分方案</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <WeekCard 
              week={1}
              title="地毯式复习"
              focus="三角形和全等三角形的判定"
              tasks={[
                '每天弄懂2个经典模型',
                '复习三角形三边关系、内角和、外角定理',
                '掌握全等三角形的四种判定定理',
                '练习证明题，学会标图、找目标、凑条件',
              ]}
              color="blue"
            />

            <WeekCard 
              week={2}
              title="专题突破"
              focus="轴对称和等腰三角形"
              tasks={[
                '攻克"将军饮马"模型',
                '掌握等腰三角形"三线合一"性质',
                '学习辅助线作法（截长补短、倍长中线等）',
                '做10-15道轴对称专题题',
              ]}
              color="green"
            />

            <WeekCard 
              week={3}
              title="代数巩固"
              focus="乘法公式和因式分解"
              tasks={[
                '每天保证20分钟纯计算练习',
                '熟练掌握平方差和完全平方公式',
                '因式分解四步法：提、套、字、组',
                '分式运算和分式方程，注意验根',
              ]}
              color="orange"
            />

            <WeekCard 
              week={4}
              title="综合提升"
              focus="一次函数和综合卷"
              tasks={[
                '做到"解析式、图像、性质"三者自由转换',
                '一次函数与方程、不等式的综合应用',
                '开始做整套真题，限时训练',
                '查漏补缺，重点突破薄弱环节',
              ]}
              color="purple"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function WeekCard({ 
  week, 
  title, 
  focus, 
  tasks, 
  color 
}: { 
  week: number; 
  title: string; 
  focus: string; 
  tasks: string[];
  color: string;
}) {
  const colorClasses = {
    blue: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20',
    green: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20',
    orange: 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20',
    purple: 'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20',
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center gap-3 mb-3">
        <Badge className={`bg-${color}-500 text-white`}>第{week}周</Badge>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{focus}</div>
        </div>
      </div>
      <ul className="space-y-1 text-sm">
        {tasks.map((task, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            <span>{task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LearningMethods() {
  return (
    <div className="space-y-4">
      <Card className="bg-white/90 dark:bg-gray-800/90">
        <CardHeader>
          <CardTitle className="text-lg">高效学习方法</CardTitle>
          <CardDescription>掌握科学的学习技巧</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <MethodCard 
              icon={<Target className="h-6 w-6 text-blue-600" />}
              title="错题本2.0"
              description="不要抄题，粘贴或裁剪"
              points={[
                '用红笔写清错误原因',
                '记录正确思路的关键步骤',
                '标注本题涉及的核心知识点',
                '定期回顾，避免重复犯错',
              ]}
            />

            <MethodCard 
              icon={<Brain className="h-6 w-6 text-green-600" />}
              title="讲题学习法"
              description="能讲明白，才是真学会"
              points={[
                '把解题思路清晰地讲给别人听',
                '可以讲给同学、家长甚至玩偶',
                '这是打通思路的最佳方法',
                '发现讲不清楚的地方就是盲区',
              ]}
            />

            <MethodCard 
              icon={<BookOpen className="h-6 w-6 text-orange-600" />}
              title="刻意练习"
              description="针对薄弱环节突破"
              points={[
                '基础差：回归课本，做例题和课后习题',
                '中等生：专题突破，集中时间做10-15道同类题',
                '总结规律，形成解题模式',
                '限时训练，提高解题速度',
              ]}
            />

            <MethodCard 
              icon={<CheckCircle2 className="h-6 w-6 text-purple-600" />}
              title="记忆心法"
              description="形成视觉和逻辑记忆"
              points={[
                '公式反复互推，像背口诀一样',
                '图形模型动手画10遍',
                '用故事想象记忆（如将军饮马）',
                '每天5道基础题保持手感',
              ]}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MethodCard({ 
  icon, 
  title, 
  description, 
  points 
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  points: string[];
}) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{description}</div>
        </div>
      </div>
      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-2" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExamStrategy() {
  return (
    <div className="space-y-4">
      <Card className="bg-white/90 dark:bg-gray-800/90">
        <CardHeader>
          <CardTitle className="text-lg">考场时间分配与检查策略</CardTitle>
          <CardDescription>合理规划，提高得分率</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="font-medium mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  时间分配（90分钟）
                </div>
                <div className="space-y-2">
                  <TimeAllocation 
                    question="1-20题（选择+填空）"
                    time="40分钟"
                    percentage="44%"
                  />
                  <TimeAllocation 
                    question="21-23题（解答题）"
                    time="30分钟"
                    percentage="33%"
                  />
                  <TimeAllocation 
                    question="24-25题（综合题）"
                    time="20分钟"
                    percentage="22%"
                  />
                  <TimeAllocation 
                    question="检查"
                    time="10分钟"
                    percentage="11%"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="font-medium mb-3">检查顺序</div>
                <ol className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Badge className="bg-green-500 mt-0.5">1</Badge>
                    <span>查计算题：核对计算过程和结果</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge className="bg-green-500 mt-0.5">2</Badge>
                    <span>查证明题：检查逻辑是否严密</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge className="bg-green-500 mt-0.5">3</Badge>
                    <span>查选择题：是否有看错题意</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge className="bg-green-500 mt-0.5">4</Badge>
                    <span>查填空题：单位、符号是否正确</span>
                  </li>
                </ol>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="font-medium mb-2">注意事项</div>
                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• 先易后难，不要在一道题上卡太久</li>
                  <li>• 草稿纸整齐，方便检查</li>
                  <li>• 分式方程记得验根</li>
                  <li>• 几何证明题要写清"因为、所以"</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TimeAllocation({ 
  question, 
  time, 
  percentage 
}: { 
  question: string; 
  time: string; 
  percentage: string;
}) {
  return (
    <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded">
      <div className="flex-1">
        <div className="text-sm font-medium">{question}</div>
        <div className="text-xs text-gray-500">{time}</div>
      </div>
      <Badge className="bg-blue-500">{percentage}</Badge>
    </div>
  );
}

function MotivationAction() {
  return (
    <div className="space-y-4">
      <Card className="bg-white/90 dark:bg-gray-800/90">
        <CardHeader>
          <CardTitle className="text-lg">激励与行动计划</CardTitle>
          <CardDescription>相信数学成绩可以提升</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">相信你自己！</div>
              <p className="text-blue-100">
                数学成绩差不是"笨"，只是暂时没有找到正确的"钥匙"。
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="font-medium mb-2 flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                几何
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                几何是思维的健身操。每搞懂一个模型，你的大脑就完成了一次升级。
              </p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="font-medium mb-2 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                函数
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                函数是世界的密码本。看到解析式想图像，看到图像想性质。
              </p>
            </div>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="font-medium mb-3">立即行动</div>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-500">✓</Badge>
                <span>每天花30分钟复习数学</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-500">✓</Badge>
                <span>做5-10道练习题保持手感</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-500">✓</Badge>
                <span>记录错题，分析原因</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-500">✓</Badge>
                <span>坚持四周，见证进步</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg text-center">
            <div className="text-lg font-semibold text-pink-600 mb-2">
              每独立做出一道难题，你离成功就更近一步！
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              开始你的提分之旅吧！
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
