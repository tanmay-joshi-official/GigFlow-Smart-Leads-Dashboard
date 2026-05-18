import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { apiFetch } from '../utils/api';
import { Lead } from '../types';
import { 
  ArrowLeft, 
  Mail, 
  Globe, 
  Instagram, 
  User as UserIcon, 
  Calendar,
  Tag,
  Share2,
  Clock,
  ShieldCheck
} from 'lucide-react';
import toast from 'react-hot-toast';

const LeadDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const data = await apiFetch(`/leads/${id}`);
        setLead(data);
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch lead details');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-96 gap-4 animate-pulse">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-bold tracking-tight">Loading details...</p>
        </div>
      </Layout>
    );
  }

  if (!lead) return null;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Contacted': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Qualified': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Lost': return 'bg-slate-50 text-slate-700 border-slate-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button
          onClick={() => navigate('/dashboard')}
          className="group inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-all active:scale-95"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Header Card */}
          <div className="p-8 md:p-12 border-b border-slate-50 bg-slate-50/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-indigo-100">
                  {lead.name.charAt(0)}
                </div>
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{lead.name}</h1>
                  <p className="text-slate-500 font-medium flex items-center gap-2">
                    <Mail size={16} className="text-slate-400" />
                    {lead.email}
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:items-end gap-3">
                <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold border shadow-sm ${getStatusStyle(lead.status)}`}>
                  {lead.status}
                </span>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <Clock size={14} />
                  Updated {new Date(lead.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-10">
              <section className="space-y-6">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Tag size={16} />
                  Source Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-100 transition-colors">
                    <span className="text-sm font-semibold text-slate-500">Primary Channel</span>
                    <span className="text-sm font-bold text-slate-900">{lead.source}</span>
                  </div>
                  
                  {lead.website && (
                    <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-100 transition-colors">
                      <span className="text-sm font-semibold text-slate-500 flex items-center gap-2">
                        <Globe size={18} className="text-slate-400 group-hover:text-indigo-500" />
                        Website
                      </span>
                      <a 
                        href={lead.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-indigo-600 hover:underline underline-offset-4"
                      >
                        Visit Link
                      </a>
                    </div>
                  )}

                  {lead.instagram && (
                    <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-100 transition-colors">
                      <span className="text-sm font-semibold text-slate-500 flex items-center gap-2">
                        <Instagram size={18} className="text-slate-400 group-hover:text-pink-500" />
                        Instagram
                      </span>
                      <span className="text-sm font-bold text-slate-900">{lead.instagram}</span>
                    </div>
                  )}

                  {lead.referral && (
                    <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-100 transition-colors">
                      <span className="text-sm font-semibold text-slate-500 flex items-center gap-2">
                        <Share2 size={18} className="text-slate-400 group-hover:text-emerald-500" />
                        Referred By
                      </span>
                      <span className="text-sm font-bold text-slate-900">{lead.referral}</span>
                    </div>
                  )}
                </div>
              </section>
            </div>

            <div className="space-y-10">
              <section className="space-y-6">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={16} />
                  Internal Info
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-sm font-semibold text-slate-500 flex items-center gap-2">
                      <UserIcon size={18} className="text-slate-400" />
                      Assigned To
                    </span>
                    <span className="text-sm font-bold text-slate-900">{lead.createdBy.name}</span>
                  </div>
                  <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-sm font-semibold text-slate-500 flex items-center gap-2">
                      <Calendar size={18} className="text-slate-400" />
                      Created Date
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {new Date(lead.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeadDetails;
