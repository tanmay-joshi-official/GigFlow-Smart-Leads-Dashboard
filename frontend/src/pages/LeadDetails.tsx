import React, { useState, useEffect } from 'react';
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
  Share2
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
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 text-lg">Loading lead details...</p>
        </div>
      </Layout>
    );
  }

  if (!lead) return null;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100 bg-gray-50/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                  {lead.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{lead.name}</h1>
                  <p className="text-gray-500 flex items-center gap-1">
                    <Mail size={16} />
                    {lead.email}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                  lead.status === 'New' ? 'bg-blue-100 text-blue-700' :
                  lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-700' :
                  lead.status === 'Qualified' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {lead.status}
                </span>
                <p className="text-sm text-gray-500">
                  Last updated {new Date(lead.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <section>
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Tag size={16} />
                  Lead Source Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-600 font-medium">Primary Source</span>
                    <span className="text-gray-900 font-bold">{lead.source}</span>
                  </div>
                  {lead.website && (
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="text-gray-600 font-medium flex items-center gap-2">
                        <Globe size={18} />
                        Website
                      </span>
                      <a 
                        href={lead.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline font-medium"
                      >
                        Visit Site
                      </a>
                    </div>
                  )}
                  {lead.instagram && (
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="text-gray-600 font-medium flex items-center gap-2">
                        <Instagram size={18} />
                        Instagram
                      </span>
                      <span className="text-gray-900 font-medium">{lead.instagram}</span>
                    </div>
                  )}
                  {lead.referral && (
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="text-gray-600 font-medium flex items-center gap-2">
                        <Share2 size={18} />
                        Referred By
                      </span>
                      <span className="text-gray-900 font-medium">{lead.referral}</span>
                    </div>
                  )}
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <UserIcon size={16} />
                  Administrative Details
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-600 font-medium">Created By</span>
                    <span className="text-gray-900 font-medium">{lead.createdBy.name}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-600 font-medium flex items-center gap-2">
                      <Calendar size={18} />
                      Created On
                    </span>
                    <span className="text-gray-900 font-medium">
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
