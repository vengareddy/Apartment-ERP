import React, { useState } from 'react';
import { Calendar, Plus, Copy, CheckCircle, Users, DollarSign } from 'lucide-react';

const CulturalTemplates: React.FC = () => {
  const [templates] = useState([
    {
      id: '1',
      name: 'Vinayaka Chavithi Festival',
      description: 'Annual Ganesh festival celebration with decorations, prasadam distribution, cultural programs, and community participation',
      category: 'religious',
      suggestedAmount: 600,
      duration: '3 days',
      venue: 'Community Hall + Garden Area',
      committee: ['Cultural Secretary', 'Decoration Head', 'Food Coordinator', 'Program Coordinator'],
      expenses: [
        { category: 'decorations', item: 'Flowers, rangoli materials, backdrop', amount: 15000 },
        { category: 'catering', item: 'Prasadam preparation and distribution', amount: 20000 },
        { category: 'entertainment', item: 'Cultural programs, music system', amount: 8000 },
        { category: 'materials', item: 'Pandal setup, lighting, seating', amount: 12000 },
        { category: 'other', item: 'Miscellaneous expenses', amount: 3000 }
      ],
      totalEstimatedCost: 58000,
      expectedParticipation: '80-85%',
      timeline: [
        { phase: 'Planning', duration: '2 weeks before', activities: ['Committee formation', 'Budget approval', 'Vendor selection'] },
        { phase: 'Collection', duration: '1 week before', activities: ['Fund collection', 'Material procurement', 'Setup preparation'] },
        { phase: 'Event', duration: '3 days', activities: ['Pandal setup', 'Daily programs', 'Prasadam distribution'] },
        { phase: 'Closure', duration: '1 day after', activities: ['Cleanup', 'Final accounts', 'Thank you messages'] }
      ]
    },
    {
      id: '2',
      name: 'Diwali Celebration',
      description: 'Festival of lights with rangoli competition, sweets distribution, fireworks display, and community dinner',
      category: 'religious',
      suggestedAmount: 500,
      duration: '2 days',
      venue: 'Garden Area + Community Hall',
      committee: ['Event Coordinator', 'Rangoli Judge', 'Sweets Distribution Head', 'Safety Coordinator'],
      expenses: [
        { category: 'decorations', item: 'Diyas, lights, rangoli materials', amount: 12000 },
        { category: 'catering', item: 'Sweets, snacks, community dinner', amount: 18000 },
        { category: 'entertainment', item: 'Fireworks, music, competitions', amount: 10000 },
        { category: 'prizes', item: 'Rangoli competition prizes', amount: 5000 }
      ],
      totalEstimatedCost: 45000,
      expectedParticipation: '85-90%',
      timeline: [
        { phase: 'Planning', duration: '3 weeks before', activities: ['Committee setup', 'Competition rules', 'Vendor booking'] },
        { phase: 'Collection', duration: '1 week before', activities: ['Fund collection', 'Material purchase', 'Setup'] },
        { phase: 'Event', duration: '2 days', activities: ['Rangoli competition', 'Community dinner', 'Fireworks'] },
        { phase: 'Closure', duration: '1 day after', activities: ['Prize distribution', 'Cleanup', 'Accounts'] }
      ]
    },
    {
      id: '3',
      name: 'New Year Celebration',
      description: 'Community New Year party with DJ, dance floor, dinner, games, and midnight countdown celebration',
      category: 'celebration',
      suggestedAmount: 800,
      duration: '1 night',
      venue: 'Community Hall + Terrace',
      committee: ['Party Coordinator', 'DJ/Music Head', 'Food & Beverages', 'Games Organizer'],
      expenses: [
        { category: 'entertainment', item: 'DJ, sound system, lighting', amount: 25000 },
        { category: 'catering', item: 'Dinner, snacks, beverages', amount: 35000 },
        { category: 'decorations', item: 'Party decorations, balloons, backdrop', amount: 8000 },
        { category: 'other', item: 'Games, prizes, miscellaneous', amount: 7000 }
      ],
      totalEstimatedCost: 75000,
      expectedParticipation: '90-95%',
      timeline: [
        { phase: 'Planning', duration: '1 month before', activities: ['Theme selection', 'DJ booking', 'Menu planning'] },
        { phase: 'Collection', duration: '2 weeks before', activities: ['Fund collection', 'Final headcount', 'Setup planning'] },
        { phase: 'Event', duration: '1 night', activities: ['Setup', 'Party execution', 'Midnight countdown'] },
        { phase: 'Closure', duration: '1 day after', activities: ['Cleanup', 'Final settlement', 'Feedback collection'] }
      ]
    }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const createActivityFromTemplate = (template: any) => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    
    // Suggest next occurrence date based on template
    const suggestedDate = template.name.includes('Vinayaka') ? `${nextYear}-08-29` :
                         template.name.includes('Diwali') ? `${nextYear}-11-01` :
                         template.name.includes('New Year') ? `${currentYear}-12-31` : '';

    alert(`Creating activity from template: ${template.name}

Suggested Details:
- Event Date: ${suggestedDate}
- Target Amount: ₹${template.totalEstimatedCost.toLocaleString()}
- Amount per Flat: ₹${template.suggestedAmount}
- Committee: ${template.committee.join(', ')}

This template will be available for Cultural Committee to manage collections and expenses.`);
  };

  const copyTemplate = (template: any) => {
    const templateText = `Cultural Activity Template: ${template.name}

Description: ${template.description}
Category: ${template.category}
Suggested Amount per Flat: ₹${template.suggestedAmount}
Total Estimated Cost: ₹${template.totalEstimatedCost.toLocaleString()}
Expected Participation: ${template.expectedParticipation}
Duration: ${template.duration}
Venue: ${template.venue}

Committee Structure:
${template.committee.map((member: string, index: number) => `${index + 1}. ${member}`).join('\n')}

Expense Breakdown:
${template.expenses.map((expense: any) => `- ${expense.category}: ${expense.item} - ₹${expense.amount.toLocaleString()}`).join('\n')}

Timeline:
${template.timeline.map((phase: any) => `${phase.phase} (${phase.duration}): ${phase.activities.join(', ')}`).join('\n')}`;

    navigator.clipboard.writeText(templateText);
    alert('Template details copied to clipboard!');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-orange-600" />
          Cultural Activity Templates
        </h2>
        <p className="text-gray-600 mb-6">
          Pre-designed templates for common cultural activities. Use these to create activities that will be managed by the Cultural Committee.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                template.category === 'religious' ? 'bg-purple-100 text-purple-800' :
                template.category === 'celebration' ? 'bg-pink-100 text-pink-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {template.category}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">{template.description}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Suggested Amount/Flat:</span>
                <span className="font-medium text-green-600">₹{template.suggestedAmount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Estimated Cost:</span>
                <span className="font-medium text-blue-600">₹{template.totalEstimatedCost.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Expected Participation:</span>
                <span className="font-medium text-purple-600">{template.expectedParticipation}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium text-gray-900">{template.duration}</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Committee Structure:</h4>
              <div className="flex flex-wrap gap-1">
                {template.committee.map((member, index) => (
                  <span key={index} className="inline-flex px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                    {member}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Major Expenses:</h4>
              <div className="space-y-1">
                {template.expenses.slice(0, 3).map((expense, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span className="text-gray-600">{expense.item}</span>
                    <span className="font-medium">₹{expense.amount.toLocaleString()}</span>
                  </div>
                ))}
                {template.expenses.length > 3 && (
                  <div className="text-xs text-gray-500">+{template.expenses.length - 3} more items...</div>
                )}
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => createActivityFromTemplate(template)}
                className="flex-1 px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center justify-center space-x-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Create Activity</span>
              </button>
              <button
                onClick={() => copyTemplate(template)}
                className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                title="Copy Template Details"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>

            {selectedTemplate === template.id && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Detailed Timeline:</h4>
                <div className="space-y-2">
                  {template.timeline.map((phase, index) => (
                    <div key={index} className="text-xs">
                      <div className="font-medium text-gray-800">{phase.phase} ({phase.duration})</div>
                      <div className="text-gray-600 ml-2">{phase.activities.join(', ')}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setSelectedTemplate(selectedTemplate === template.id ? null : template.id)}
              className="w-full mt-3 text-xs text-blue-600 hover:text-blue-700"
            >
              {selectedTemplate === template.id ? 'Hide Details' : 'View Timeline Details'}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">How Cultural Activity Management Works</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-medium text-blue-900">Admin/Treasurer Creates</h4>
            </div>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use templates to create activities</li>
              <li>• Set target amounts and dates</li>
              <li>• Assign committee members</li>
              <li>• Define expense categories</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h4 className="font-medium text-green-900">Cultural Committee Manages</h4>
            </div>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Collect funds from residents</li>
              <li>• Record all expenses</li>
              <li>• Send WhatsApp notifications</li>
              <li>• Track participation</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h4 className="font-medium text-purple-900">Public Forum</h4>
            </div>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Transparent expense reports</li>
              <li>• Collection status updates</li>
              <li>• Activity photos and feedback</li>
              <li>• Financial accountability</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h3 className="font-medium text-yellow-900 mb-2">Template Usage Instructions</h3>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Click "Create Activity" to use a template for creating a new cultural activity</li>
          <li>• Templates include suggested amounts, committee structure, and expense breakdown</li>
          <li>• Once created, activities will be available in Cultural Committee login for management</li>
          <li>• Cultural Committee can then collect funds and record expenses for these activities</li>
          <li>• All transactions will be tracked separately from regular maintenance funds</li>
        </ul>
      </div>
    </div>
  );
};

export default CulturalTemplates;