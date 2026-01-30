import React from 'react';
import { motion } from 'framer-motion';
import { FolderKanban, MessageSquareQuote, HelpCircle, Mail, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProjects } from '@/hooks/useProjects';
import { useTestimonials } from '@/hooks/useTestimonials';
import { useFAQs } from '@/hooks/useFAQs';
import { useContactSubmissions } from '@/hooks/useContactSubmissions';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const AdminOverview: React.FC = () => {
  const { data: projects = [] } = useProjects();
  const { data: testimonials = [] } = useTestimonials();
  const { data: faqs = [] } = useFAQs();
  const { data: submissions = [] } = useContactSubmissions();

  const newMessages = submissions.filter(s => s.status === 'new').length;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Welcome to your admin dashboard</p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Projects"
          value={projects.length}
          icon={<FolderKanban className="h-4 w-4" />}
          description={`${projects.filter(p => p.featured).length} featured`}
          delay={0.1}
        />
        <StatCard
          title="Testimonials"
          value={testimonials.length}
          icon={<MessageSquareQuote className="h-4 w-4" />}
          description={`${testimonials.filter(t => t.featured).length} featured`}
          delay={0.2}
        />
        <StatCard
          title="FAQs"
          value={faqs.length}
          icon={<HelpCircle className="h-4 w-4" />}
          description="Total questions"
          delay={0.3}
        />
        <StatCard
          title="Messages"
          value={submissions.length}
          icon={<Mail className="h-4 w-4" />}
          description={`${newMessages} unread`}
          delay={0.4}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <a
                href="/admin/projects"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <FolderKanban className="h-5 w-5 text-primary" />
                <span className="font-medium">Manage Projects</span>
              </a>
              <a
                href="/admin/testimonials"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <MessageSquareQuote className="h-5 w-5 text-primary" />
                <span className="font-medium">Manage Testimonials</span>
              </a>
              <a
                href="/admin/faqs"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <HelpCircle className="h-5 w-5 text-primary" />
                <span className="font-medium">Manage FAQs</span>
              </a>
              <a
                href="/admin/messages"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <Mail className="h-5 w-5 text-primary" />
                <span className="font-medium">View Messages</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminOverview;
