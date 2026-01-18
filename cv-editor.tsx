'use client';

import { useState } from 'react';
import { CVData, WorkExperience, BlogPost, Speaking, Project, Volunteer, Certificate, Education } from '@/types/cv';
import { saveCVData } from '@/lib/cv-data';
import { X, Plus, Trash2 } from 'lucide-react';

interface CVEditorProps {
  cvData: CVData;
  setCVData: (data: CVData) => void;
  onClose: () => void;
}

export default function CVEditor({ cvData, setCVData, onClose }: CVEditorProps) {
  const [data, setData] = useState<CVData>(cvData);
  const [activeSection, setActiveSection] = useState<string>('basic');

  const handleSave = () => {
    setCVData(data);
    saveCVData(data);
    onClose();
  };

  const updateField = <K extends keyof CVData>(field: K, value: CVData[K]) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const addItem = <T,>(field: keyof CVData, item: T) => {
    setData(prev => ({
      ...prev,
      [field]: [...(prev[field] as T[]), item],
    }));
  };

  const updateItem = <T extends { id: string }>(field: keyof CVData, id: string, updates: Partial<T>) => {
    setData(prev => ({
      ...prev,
      [field]: (prev[field] as T[]).map(item => 
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  };

  const removeItem = (field: keyof CVData, id: string) => {
    setData(prev => ({
      ...prev,
      [field]: (prev[field] as any[]).filter(item => item.id !== id),
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Edit Your CV</h1>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-foreground text-background rounded-md hover:opacity-90"
            >
              Save & Close
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-foreground/20 rounded-md hover:bg-foreground/5"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {[
                { id: 'basic', label: 'Basic Info' },
                { id: 'work', label: 'Work Experience' },
                { id: 'blog', label: 'Writing/Blog' },
                { id: 'speaking', label: 'Speaking' },
                { id: 'projects', label: 'Side Projects' },
                { id: 'volunteer', label: 'Volunteer' },
                { id: 'certificates', label: 'Certificates' },
                { id: 'education', label: 'Education' },
                { id: 'contact', label: 'Contact' },
              ].map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeSection === section.id
                      ? 'bg-foreground/10 font-medium'
                      : 'hover:bg-foreground/5'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeSection === 'basic' && (
              <BasicInfoEditor data={data} updateField={updateField} />
            )}
            {activeSection === 'work' && (
              <SectionEditor
                title="Work Experience"
                items={data.workExperience}
                onAdd={() => addItem('workExperience', {
                  id: Date.now().toString(),
                  company: '',
                  role: '',
                  location: '',
                  startDate: '',
                  endDate: null,
                })}
                onUpdate={(id, updates) => updateItem('workExperience', id, updates)}
                onRemove={(id) => removeItem('workExperience', id)}
                renderForm={(item, onUpdate) => <WorkExperienceForm item={item} onUpdate={onUpdate} />}
              />
            )}
            {activeSection === 'blog' && (
              <SectionEditor
                title="Writing/Blog"
                items={data.blog}
                onAdd={() => addItem('blog', {
                  id: Date.now().toString(),
                  title: '',
                  date: new Date().getFullYear().toString(),
                  readTime: '1 min read',
                })}
                onUpdate={(id, updates) => updateItem('blog', id, updates)}
                onRemove={(id) => removeItem('blog', id)}
                renderForm={(item, onUpdate) => <BlogForm item={item} onUpdate={onUpdate} />}
              />
            )}
            {activeSection === 'speaking' && (
              <SectionEditor
                title="Speaking"
                items={data.speaking}
                onAdd={() => addItem('speaking', {
                  id: Date.now().toString(),
                  title: '',
                  date: new Date().getFullYear().toString(),
                  location: '',
                })}
                onUpdate={(id, updates) => updateItem('speaking', id, updates)}
                onRemove={(id) => removeItem('speaking', id)}
                renderForm={(item, onUpdate) => <SpeakingForm item={item} onUpdate={onUpdate} />}
              />
            )}
            {activeSection === 'projects' && (
              <SectionEditor
                title="Side Projects"
                items={data.projects}
                onAdd={() => addItem('projects', {
                  id: Date.now().toString(),
                  title: '',
                  date: new Date().getFullYear().toString(),
                })}
                onUpdate={(id, updates) => updateItem('projects', id, updates)}
                onRemove={(id) => removeItem('projects', id)}
                renderForm={(item, onUpdate) => <ProjectForm item={item} onUpdate={onUpdate} />}
              />
            )}
            {activeSection === 'volunteer' && (
              <SectionEditor
                title="Volunteer"
                items={data.volunteer}
                onAdd={() => addItem('volunteer', {
                  id: Date.now().toString(),
                  organization: '',
                  role: '',
                  location: '',
                  startDate: '',
                  endDate: null,
                })}
                onUpdate={(id, updates) => updateItem('volunteer', id, updates)}
                onRemove={(id) => removeItem('volunteer', id)}
                renderForm={(item, onUpdate) => <VolunteerForm item={item} onUpdate={onUpdate} />}
              />
            )}
            {activeSection === 'certificates' && (
              <SectionEditor
                title="Certificates"
                items={data.certificates}
                onAdd={() => addItem('certificates', {
                  id: Date.now().toString(),
                  title: '',
                  issuer: '',
                  date: new Date().getFullYear().toString(),
                })}
                onUpdate={(id, updates) => updateItem('certificates', id, updates)}
                onRemove={(id) => removeItem('certificates', id)}
                renderForm={(item, onUpdate) => <CertificateForm item={item} onUpdate={onUpdate} />}
              />
            )}
            {activeSection === 'education' && (
              <SectionEditor
                title="Education"
                items={data.education}
                onAdd={() => addItem('education', {
                  id: Date.now().toString(),
                  degree: '',
                  institution: '',
                  location: '',
                  startDate: '',
                  endDate: '',
                })}
                onUpdate={(id, updates) => updateItem('education', id, updates)}
                onRemove={(id) => removeItem('education', id)}
                renderForm={(item, onUpdate) => <EducationForm item={item} onUpdate={onUpdate} />}
              />
            )}
            {activeSection === 'contact' && (
              <ContactEditor data={data} updateField={updateField} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Basic Info Editor
function BasicInfoEditor({ data, updateField }: { data: CVData; updateField: <K extends keyof CVData>(field: K, value: CVData[K]) => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Basic Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => updateField('title', e.target.value)}
            className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => updateField('location', e.target.value)}
            className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Website</label>
          <input
            type="text"
            value={data.website || ''}
            onChange={(e) => updateField('website', e.target.value)}
            className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
            placeholder="website.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Avatar URL</label>
          <input
            type="text"
            value={data.avatar || ''}
            onChange={(e) => updateField('avatar', e.target.value)}
            className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">About</label>
          <textarea
            value={data.about}
            onChange={(e) => updateField('about', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
          />
        </div>
      </div>
    </div>
  );
}

// Generic Section Editor
function SectionEditor<T extends { id: string }>({
  title,
  items,
  onAdd,
  onUpdate,
  onRemove,
  renderForm,
}: {
  title: string;
  items: T[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<T>) => void;
  onRemove: (id: string) => void;
  renderForm: (item: T, onUpdate: (updates: Partial<T>) => void) => React.ReactNode;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-md hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>
      <div className="space-y-4">
        {items.map((item) => {
          const getDisplayName = () => {
            if ('title' in item) return (item as any).title || 'Untitled';
            if ('role' in item && 'company' in item) return `${(item as any).role} at ${(item as any).company}`;
            if ('role' in item && 'organization' in item) return `${(item as any).role} at ${(item as any).organization}`;
            if ('degree' in item) return (item as any).degree || 'Untitled';
            return 'Item';
          };
          
          return (
            <div key={item.id} className="border border-foreground/20 rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <button
                  onClick={() => {
                    const newExpanded = new Set(expanded);
                    if (newExpanded.has(item.id)) {
                      newExpanded.delete(item.id);
                    } else {
                      newExpanded.add(item.id);
                    }
                    setExpanded(newExpanded);
                  }}
                  className="flex-1 text-left font-medium hover:opacity-70"
                >
                  {expanded.has(item.id) ? '▼' : '▶'} {getDisplayName()}
                </button>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {expanded.has(item.id) && (
                <div className="mt-4">
                  {renderForm(item, (updates) => onUpdate(item.id, updates))}
                </div>
              )}
            </div>
          );
        })}
        {items.length === 0 && (
          <p className="text-foreground/60 text-center py-8">No items yet. Click "Add" to get started.</p>
        )}
      </div>
    </div>
  );
}

// Form components for each section
function WorkExperienceForm({ item, onUpdate }: { item: WorkExperience; onUpdate: (updates: Partial<WorkExperience>) => void }) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Role"
        value={item.role}
        onChange={(e) => onUpdate({ role: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <input
        type="text"
        placeholder="Company"
        value={item.company}
        onChange={(e) => onUpdate({ company: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <input
        type="text"
        placeholder="Location"
        value={item.location}
        onChange={(e) => onUpdate({ location: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="Start Date (e.g., 2017)"
          value={item.startDate}
          onChange={(e) => onUpdate({ startDate: e.target.value })}
          className="px-3 py-2 border border-foreground/20 rounded-md bg-background"
        />
        <input
          type="text"
          placeholder="End Date (e.g., Now or 2020)"
          value={item.endDate || ''}
          onChange={(e) => onUpdate({ endDate: e.target.value || null })}
          className="px-3 py-2 border border-foreground/20 rounded-md bg-background"
        />
      </div>
      <textarea
        placeholder="Description (optional)"
        value={item.description || ''}
        onChange={(e) => onUpdate({ description: e.target.value })}
        rows={3}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <input
        type="text"
        placeholder="Link (optional)"
        value={item.link || ''}
        onChange={(e) => onUpdate({ link: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
    </div>
  );
}

function BlogForm({ item, onUpdate }: { item: BlogPost; onUpdate: (updates: Partial<BlogPost>) => void }) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Title"
        value={item.title}
        onChange={(e) => onUpdate({ title: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <input
        type="text"
        placeholder="Date (e.g., 2023)"
        value={item.date}
        onChange={(e) => onUpdate({ date: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <input
        type="text"
        placeholder="Read Time (e.g., 1 min read)"
        value={item.readTime}
        onChange={(e) => onUpdate({ readTime: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <input
        type="text"
        placeholder="Collaborators (comma-separated)"
        value={item.collaborators?.join(', ') || ''}
        onChange={(e) => onUpdate({ collaborators: e.target.value ? e.target.value.split(',').map(s => s.trim()) : undefined })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <input
        type="text"
        placeholder="Image URL (optional)"
        value={item.image || ''}
        onChange={(e) => onUpdate({ image: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <input
        type="text"
        placeholder="Link (optional)"
        value={item.link || ''}
        onChange={(e) => onUpdate({ link: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
    </div>
  );
}

function SpeakingForm({ item, onUpdate }: { item: Speaking; onUpdate: (updates: Partial<Speaking>) => void }) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Title"
        value={item.title}
        onChange={(e) => onUpdate({ title: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <input
        type="text"
        placeholder="Date (e.g., 2024)"
        value={item.date}
        onChange={(e) => onUpdate({ date: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <input
        type="text"
        placeholder="Location"
        value={item.location}
        onChange={(e) => onUpdate({ location: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <input
        type="text"
        placeholder="Link (optional)"
        value={item.link || ''}
        onChange={(e) => onUpdate({ link: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
    </div>
  );
}

function ProjectForm({ item, onUpdate }: { item: Project; onUpdate: (updates: Partial<Project>) => void }) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Title"
        value={item.title}
        onChange={(e) => onUpdate({ title: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <input
        type="text"
        placeholder="Date (e.g., 2021)"
        value={item.date}
        onChange={(e) => onUpdate({ date: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <textarea
        placeholder="Description (optional)"
        value={item.description || ''}
        onChange={(e) => onUpdate({ description: e.target.value })}
        rows={3}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <input
        type="text"
        placeholder="Link (optional)"
        value={item.link || ''}
        onChange={(e) => onUpdate({ link: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
    </div>
  );
}

function VolunteerForm({ item, onUpdate }: { item: Volunteer; onUpdate: (updates: Partial<Volunteer>) => void }) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Role"
        value={item.role}
        onChange={(e) => onUpdate({ role: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <input
        type="text"
        placeholder="Organization"
        value={item.organization}
        onChange={(e) => onUpdate({ organization: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <input
        type="text"
        placeholder="Location"
        value={item.location}
        onChange={(e) => onUpdate({ location: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="Start Date"
          value={item.startDate}
          onChange={(e) => onUpdate({ startDate: e.target.value })}
          className="px-3 py-2 border border-foreground/20 rounded-md bg-background"
        />
        <input
          type="text"
          placeholder="End Date (or leave empty)"
          value={item.endDate || ''}
          onChange={(e) => onUpdate({ endDate: e.target.value || null })}
          className="px-3 py-2 border border-foreground/20 rounded-md bg-background"
        />
      </div>
      <textarea
        placeholder="Description (optional)"
        value={item.description || ''}
        onChange={(e) => onUpdate({ description: e.target.value })}
        rows={3}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
    </div>
  );
}

function CertificateForm({ item, onUpdate }: { item: Certificate; onUpdate: (updates: Partial<Certificate>) => void }) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Title"
        value={item.title}
        onChange={(e) => onUpdate({ title: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <input
        type="text"
        placeholder="Issuer"
        value={item.issuer}
        onChange={(e) => onUpdate({ issuer: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <input
        type="text"
        placeholder="Date (e.g., 2023)"
        value={item.date}
        onChange={(e) => onUpdate({ date: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <input
        type="text"
        placeholder="Credential ID (optional)"
        value={item.credentialId || ''}
        onChange={(e) => onUpdate({ credentialId: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <input
        type="text"
        placeholder="Image URL (optional)"
        value={item.image || ''}
        onChange={(e) => onUpdate({ image: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <input
        type="text"
        placeholder="Link (optional)"
        value={item.link || ''}
        onChange={(e) => onUpdate({ link: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
    </div>
  );
}

function EducationForm({ item, onUpdate }: { item: Education; onUpdate: (updates: Partial<Education>) => void }) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Degree (e.g., Master's in Interaction Design)"
        value={item.degree}
        onChange={(e) => onUpdate({ degree: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <input
        type="text"
        placeholder="Institution"
        value={item.institution}
        onChange={(e) => onUpdate({ institution: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <input
        type="text"
        placeholder="Location"
        value={item.location}
        onChange={(e) => onUpdate({ location: e.target.value })}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="Start Date (e.g., 2010)"
          value={item.startDate}
          onChange={(e) => onUpdate({ startDate: e.target.value })}
          className="px-3 py-2 border border-foreground/20 rounded-md bg-background"
        />
        <input
          type="text"
          placeholder="End Date (e.g., 2010)"
          value={item.endDate}
          onChange={(e) => onUpdate({ endDate: e.target.value })}
          className="px-3 py-2 border border-foreground/20 rounded-md bg-background"
        />
      </div>
      <textarea
        placeholder="Description (optional)"
        value={item.description || ''}
        onChange={(e) => onUpdate({ description: e.target.value })}
        rows={3}
        className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
      />
    </div>
  );
}

function ContactEditor({ data, updateField }: { data: CVData; updateField: <K extends keyof CVData>(field: K, value: CVData[K]) => void }) {
  const [contact, setContact] = useState(data.contact);
  
  const updateContact = (key: keyof typeof contact, value: string) => {
    const newContact = { ...contact, [key]: value };
    setContact(newContact);
    updateField('contact', newContact);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Contact Information</h2>
      <div className="space-y-4">
        {(['threads', 'figma', 'instagram', 'bluesky', 'mastodon', 'x', 'linkedin', 'github', 'email'] as const).map(key => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1 capitalize">{key === 'x' ? 'X (Twitter)' : key}</label>
            <input
              type="text"
              value={contact[key] || ''}
              onChange={(e) => updateContact(key, e.target.value)}
              className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background"
              placeholder={`Your ${key} username or URL`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
