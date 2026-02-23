import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Copy, Star, StarOff, GripVertical, Loader2, ChevronRight, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
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
} from '@/components/ui/alert-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
  useDuplicateProject,
  Project,
  ProjectInsert,
} from '@/hooks/useProjects';
import { useImageUpload } from '@/hooks/useImageUpload';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { GalleryUpload } from '@/components/admin/GalleryUpload';
import {
  useProjectGallery,
  useAddProjectGalleryImage,
  useRemoveProjectGalleryImage,
} from '@/hooks/useProjectGallery';

const STEPS = [
  { id: 1, title: 'Basics & images' },
  { id: 2, title: 'Gallery' },
  { id: 3, title: 'Content' },
  { id: 4, title: 'Meta & options' },
];

const emptyProject: ProjectInsert = {
  title: '',
  description: '',
  category: '',
  image_url: '',
  logo_url: '',
  featured_image_url: '',
  content: '',
  date: '',
  duration: '',
  featured: false,
  display_order: 0,
};

const AdminProjects: React.FC = () => {
  const { data: projects = [], isLoading } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const duplicateProject = useDuplicateProject();
  const { uploadImage, uploading } = useImageUpload('project-images');

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectInsert>(emptyProject);
  const [step, setStep] = useState(1);
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);

  const { data: galleryImages = [] } = useProjectGallery(editingProject?.id ?? null);
  const addGalleryImage = useAddProjectGalleryImage();
  const removeGalleryImage = useRemoveProjectGalleryImage();

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData(emptyProject);
    setStep(1);
    setIsSheetOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      image_url: project.image_url,
      logo_url: project.logo_url,
      featured_image_url: project.featured_image_url,
      content: project.content,
      date: project.date,
      duration: project.duration,
      featured: project.featured,
      display_order: project.display_order,
    });
    setStep(1);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setFormData(emptyProject);
    setEditingProject(null);
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editingProject;
    try {
      if (editingProject) {
        await updateProject.mutateAsync({ id: editingProject.id, ...formData });
      } else {
        await createProject.mutateAsync(formData);
      }
      handleCloseSheet();
      toast.success(isEdit ? 'Project updated' : 'Project created');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save project');
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
      await updateProject.mutateAsync({ id: project.id, featured: !project.featured });
      toast.success(project.featured ? 'Removed from featured' : 'Added to featured');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update featured');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject.mutateAsync(id);
      toast.success('Project deleted');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete project');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio projects</p>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={(open) => !open && handleCloseSheet()}>
          <Button onClick={handleOpenCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
          <SheetContent
            side="right"
            className="w-full sm:max-w-xl flex flex-col p-0 gap-0 overflow-hidden"
          >
            <SheetHeader className="p-4 border-b border-border shrink-0">
              <SheetTitle className="text-left">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </SheetTitle>
            </SheetHeader>

            {/* Step indicator */}
            <div className="flex gap-1 p-4 pb-0 shrink-0">
              {STEPS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStep(s.id)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    step === s.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {s.id}
                </button>
              ))}
              <span className="ml-2 text-xs text-muted-foreground self-center">{STEPS[step - 1].title}</span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {step === 1 && (
                  <>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          value={formData.category || ''}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Project Image</Label>
                      <ImageUpload
                        value={formData.image_url || ''}
                        onChange={(url) => setFormData({ ...formData, image_url: url })}
                        onUpload={uploadImage}
                        uploading={uploading}
                        placeholder="Enter image URL or upload"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Logo Image</Label>
                      <ImageUpload
                        value={formData.logo_url || ''}
                        onChange={(url) => setFormData({ ...formData, logo_url: url })}
                        onUpload={uploadImage}
                        uploading={uploading}
                        placeholder="Enter logo URL or upload"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Featured Image (fallback if no gallery)</Label>
                      <ImageUpload
                        value={formData.featured_image_url || ''}
                        onChange={(url) => setFormData({ ...formData, featured_image_url: url })}
                        onUpload={uploadImage}
                        uploading={uploading}
                        placeholder="Optional"
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    {editingProject ? (
                      <GalleryUpload
                        images={galleryImages}
                        onUpload={uploadImage}
                        onAdd={async (url) => {
                          await addGalleryImage.mutateAsync({
                            project_id: editingProject.id,
                            image_url: url,
                            display_order: galleryImages.length,
                          });
                        }}
                        onRemove={async (id) => {
                          await removeGalleryImage.mutateAsync({ id, project_id: editingProject.id });
                        }}
                        uploading={uploading}
                        disabled={addGalleryImage.isPending || removeGalleryImage.isPending}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Save the project first, then edit it to add gallery images for the detail page.
                      </p>
                    )}
                  </>
                )}

                {step === 3 && (
                  <div className="space-y-2">
                    <Label>Detail Page Content</Label>
                    <RichTextEditor
                      value={formData.content || ''}
                      onChange={(html) => setFormData({ ...formData, content: html })}
                      placeholder="Write the full project story, about, services, etc."
                      minHeight="220px"
                      onImageUpload={uploadImage}
                    />
                  </div>
                )}

                {step === 4 && (
                  <>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          value={formData.date || ''}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          placeholder="e.g., March 2024"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                          id="duration"
                          value={formData.duration || ''}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          placeholder="e.g., 3 months"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="display_order">Display Order</Label>
                        <Input
                          id="display_order"
                          type="number"
                          value={formData.display_order ?? 0}
                          onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      <div className="flex items-center gap-3 pt-8">
                        <Switch
                          id="featured"
                          checked={formData.featured ?? false}
                          onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                        />
                        <Label htmlFor="featured">Featured project</Label>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <SheetFooter className="p-4 border-t border-border shrink-0 flex flex-row items-center justify-between gap-3">
                <Button type="button" variant="outline" onClick={handleCloseSheet}>
                  Close
                </Button>
                <div className="flex gap-2">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                  )}
                  {step < 4 ? (
                    <Button type="button" onClick={() => setStep(step + 1)}>
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={createProject.isPending || updateProject.isPending || uploading}
                    >
                      {(createProject.isPending || updateProject.isPending) && (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      )}
                      {editingProject ? 'Update' : 'Create'}
                    </Button>
                  )}
                </div>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>All Projects ({projects.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No projects yet. Add your first project to get started.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead className="w-16">Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      </TableCell>
                      <TableCell>
                        {project.image_url ? (
                          <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-12 h-8 rounded object-cover"
                          />
                        ) : (
                          <div className="w-12 h-8 rounded bg-muted" />
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>{project.category || '-'}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleFeatured(project)}
                        >
                          {project.featured ? (
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ) : (
                            <StarOff className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>{project.display_order}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={async () => {
                              setDuplicatingId(project.id);
                              try {
                                await duplicateProject.mutateAsync(project.id);
                              } finally {
                                setDuplicatingId(null);
                              }
                            }}
                            disabled={duplicatingId !== null}
                            title="Duplicate project"
                          >
                            {duplicatingId === project.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenEdit(project)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Project</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{project.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(project.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminProjects;
