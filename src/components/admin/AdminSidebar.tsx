import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  MessageSquareQuote, 
  HelpCircle, 
  Mail, 
  LogOut,
  ChevronLeft,
  Cog,
  Image
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        )
      }
    >
      {icon}
      {label}
    </NavLink>
  );
};

const AdminSidebar: React.FC = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <p className="text-xs text-muted-foreground mt-1 truncate">{user?.email}</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        <NavItem to="/admin" icon={<LayoutDashboard className="h-4 w-4" />} label="Overview" />
        <NavItem to="/admin/hero" icon={<Image className="h-4 w-4" />} label="Hero Section" />
        <NavItem to="/admin/projects" icon={<FolderKanban className="h-4 w-4" />} label="Projects" />
        <NavItem to="/admin/how-we-work" icon={<Cog className="h-4 w-4" />} label="How We Work" />
        <NavItem to="/admin/testimonials" icon={<MessageSquareQuote className="h-4 w-4" />} label="Testimonials" />
        <NavItem to="/admin/faqs" icon={<HelpCircle className="h-4 w-4" />} label="FAQs" />
        <NavItem to="/admin/messages" icon={<Mail className="h-4 w-4" />} label="Messages" />
      </nav>
      
      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => navigate('/')}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Site
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
