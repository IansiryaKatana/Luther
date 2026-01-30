import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Loader2, GripVertical } from "lucide-react";
import { toast } from "sonner";
import {
  useHowWeWorkSteps,
  useCreateHowWeWorkStep,
  useUpdateHowWeWorkStep,
  useDeleteHowWeWorkStep,
  useHowWeWorkStats,
  useCreateHowWeWorkStat,
  useUpdateHowWeWorkStat,
  useDeleteHowWeWorkStat,
  useServicesMarquee,
  useCreateServiceMarquee,
  useUpdateServiceMarquee,
  useDeleteServiceMarquee,
  HowWeWorkStep,
  HowWeWorkStat,
  ServiceMarquee,
} from "@/hooks/useHowWeWork";

export default function AdminHowWeWork() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">How We Work</h1>
        <p className="text-muted-foreground mt-2">
          Manage process steps, stats, and services marquee
        </p>
      </div>

      <Tabs defaultValue="steps" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="steps">Process Steps</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="services">Services Marquee</TabsTrigger>
        </TabsList>
        <TabsContent value="steps" className="mt-6">
          <StepsTab />
        </TabsContent>
        <TabsContent value="stats" className="mt-6">
          <StatsTab />
        </TabsContent>
        <TabsContent value="services" className="mt-6">
          <ServicesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Steps Tab Component
function StepsTab() {
  const { data: steps, isLoading } = useHowWeWorkSteps();
  const createStep = useCreateHowWeWorkStep();
  const updateStep = useUpdateHowWeWorkStep();
  const deleteStep = useDeleteHowWeWorkStep();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<HowWeWorkStep | null>(null);
  const [formData, setFormData] = useState({
    phase: "",
    step_number: "",
    title: "",
    duration: "",
    points: "",
    display_order: 0,
  });

  const resetForm = () => {
    setFormData({
      phase: "",
      step_number: "",
      title: "",
      duration: "",
      points: "",
      display_order: 0,
    });
    setEditingStep(null);
  };

  const handleEdit = (step: HowWeWorkStep) => {
    setEditingStep(step);
    setFormData({
      phase: step.phase,
      step_number: step.step_number,
      title: step.title,
      duration: step.duration || "",
      points: step.points.join("\n"),
      display_order: step.display_order || 0,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pointsArray = formData.points.split("\n").filter((p) => p.trim());

    try {
      if (editingStep) {
        await updateStep.mutateAsync({
          id: editingStep.id,
          phase: formData.phase,
          step_number: formData.step_number,
          title: formData.title,
          duration: formData.duration || null,
          points: pointsArray,
          display_order: formData.display_order,
        });
        toast.success("Step updated successfully");
      } else {
        await createStep.mutateAsync({
          phase: formData.phase,
          step_number: formData.step_number,
          title: formData.title,
          duration: formData.duration || null,
          points: pointsArray,
          display_order: formData.display_order,
        });
        toast.success("Step created successfully");
      }
      setIsDialogOpen(false);
      resetForm();
    } catch {
      toast.error("Failed to save step");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteStep.mutateAsync(id);
      toast.success("Step deleted successfully");
    } catch {
      toast.error("Failed to delete step");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Step
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingStep ? "Edit Step" : "Add New Step"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phase</Label>
                  <Input
                    value={formData.phase}
                    onChange={(e) => setFormData({ ...formData, phase: e.target.value })}
                    placeholder="e.g., Discovery"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Step Number</Label>
                  <Input
                    value={formData.step_number}
                    onChange={(e) => setFormData({ ...formData, step_number: e.target.value })}
                    placeholder="e.g., 01"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Step title"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 13 - 15 days"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Points (one per line)</Label>
                <Textarea
                  value={formData.points}
                  onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                  placeholder="Enter each point on a new line"
                  rows={5}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createStep.isPending || updateStep.isPending}>
                  {(createStep.isPending || updateStep.isPending) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingStep ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {steps?.map((step) => (
          <Card key={step.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <GripVertical className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                      {step.phase}
                    </span>
                    <span className="font-bold text-lg">{step.step_number}</span>
                  </div>
                  <p className="font-medium mt-1">{step.title}</p>
                  <p className="text-sm text-muted-foreground">{step.duration}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(step)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Step?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(step.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Stats Tab Component
function StatsTab() {
  const { data: stats, isLoading } = useHowWeWorkStats();
  const createStat = useCreateHowWeWorkStat();
  const updateStat = useUpdateHowWeWorkStat();
  const deleteStat = useDeleteHowWeWorkStat();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<HowWeWorkStat | null>(null);
  const [formData, setFormData] = useState({
    stat_value: "",
    label: "",
    unit: "",
    is_highlighted: false,
    display_order: 0,
  });

  const resetForm = () => {
    setFormData({ stat_value: "", label: "", unit: "", is_highlighted: false, display_order: 0 });
    setEditingStat(null);
  };

  const handleEdit = (stat: HowWeWorkStat) => {
    setEditingStat(stat);
    setFormData({
      stat_value: stat.stat_value,
      label: stat.label,
      unit: stat.unit,
      is_highlighted: stat.is_highlighted || false,
      display_order: stat.display_order || 0,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingStat) {
        await updateStat.mutateAsync({ id: editingStat.id, ...formData });
        toast.success("Stat updated successfully");
      } else {
        await createStat.mutateAsync(formData);
        toast.success("Stat created successfully");
      }
      setIsDialogOpen(false);
      resetForm();
    } catch {
      toast.error("Failed to save stat");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteStat.mutateAsync(id);
      toast.success("Stat deleted successfully");
    } catch {
      toast.error("Failed to delete stat");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Stat
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingStat ? "Edit Stat" : "Add New Stat"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Value</Label>
                  <Input
                    value={formData.stat_value}
                    onChange={(e) => setFormData({ ...formData, stat_value: e.target.value })}
                    placeholder="e.g., 95+"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Unit</Label>
                  <Input
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    placeholder="e.g., Percent"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Label</Label>
                <Input
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g., Customer satisfaction"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    checked={formData.is_highlighted}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_highlighted: checked })}
                  />
                  <Label>Highlighted</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createStat.isPending || updateStat.isPending}>
                  {(createStat.isPending || updateStat.isPending) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingStat ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats?.map((stat) => (
          <Card key={stat.id} className={stat.is_highlighted ? "border-primary" : ""}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-4xl font-bold">{stat.stat_value}</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(stat)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Stat?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(stat.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{stat.unit}</p>
              <p className="font-medium">{stat.label}</p>
              {stat.is_highlighted && (
                <span className="text-xs text-primary">Highlighted</span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Services Tab Component
function ServicesTab() {
  const { data: services, isLoading } = useServicesMarquee();
  const createService = useCreateServiceMarquee();
  const updateService = useUpdateServiceMarquee();
  const deleteService = useDeleteServiceMarquee();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceMarquee | null>(null);
  const [formData, setFormData] = useState({ service_name: "", display_order: 0 });

  const resetForm = () => {
    setFormData({ service_name: "", display_order: 0 });
    setEditingService(null);
  };

  const handleEdit = (service: ServiceMarquee) => {
    setEditingService(service);
    setFormData({ service_name: service.service_name, display_order: service.display_order || 0 });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingService) {
        await updateService.mutateAsync({ id: editingService.id, ...formData });
        toast.success("Service updated successfully");
      } else {
        await createService.mutateAsync(formData);
        toast.success("Service created successfully");
      }
      setIsDialogOpen(false);
      resetForm();
    } catch {
      toast.error("Failed to save service");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteService.mutateAsync(id);
      toast.success("Service deleted successfully");
    } catch {
      toast.error("Failed to delete service");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Service Name</Label>
                <Input
                  value={formData.service_name}
                  onChange={(e) => setFormData({ ...formData, service_name: e.target.value })}
                  placeholder="e.g., Web development"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createService.isPending || updateService.isPending}>
                  {(createService.isPending || updateService.isPending) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingService ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-wrap gap-2">
        {services?.map((service) => (
          <div
            key={service.id}
            className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border"
          >
            <span>{service.service_name}</span>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleEdit(service)}>
              <Pencil className="h-3 w-3" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Service?</AlertDialogTitle>
                  <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(service.id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>
    </div>
  );
}
