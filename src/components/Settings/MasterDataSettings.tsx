import React, { useState } from 'react';
import { Save, Plus, Trash2, Edit, Users, Building, Tag } from 'lucide-react';

const MasterDataSettings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('vendors');
  const [vendors, setVendors] = useState([
    { id: '1', name: 'Green Gardens Services', contactPerson: 'Ravi Kumar', phone: '+91 98765 43210', email: 'ravi@greengardens.com', serviceType: 'Gardening', gstin: '29ABCDE1234F1Z5', isActive: true },
    { id: '2', name: 'Secure Solutions', contactPerson: 'Amit Singh', phone: '+91 98765 43211', email: 'amit@securesolutions.com', serviceType: 'Security', gstin: '29FGHIJ5678K2Z6', isActive: true },
    { id: '3', name: 'PowerTech Electrical', contactPerson: 'Suresh Reddy', phone: '+91 98765 43212', email: 'suresh@powertech.com', serviceType: 'Electrical', gstin: '29KLMNO9012L3Z7', isActive: true },
    { id: '4', name: 'CleanPro Services', contactPerson: 'Priya Sharma', phone: '+91 98765 43213', email: 'priya@cleanpro.com', serviceType: 'Cleaning', gstin: '29PQRST3456M4Z8', isActive: true },
    { id: '5', name: 'AquaFix Plumbers', contactPerson: 'Rajesh Patel', phone: '+91 98765 43214', email: 'rajesh@aquafix.com', serviceType: 'Plumbing', gstin: '29UVWXY7890N5Z9', isActive: true },
  ]);

  const [employees, setEmployees] = useState([
    { id: '1', name: 'Ramesh Kumar', designation: 'Security Guard', phone: '+91 98765 43220', salary: 25000, joinDate: '2023-01-15', isActive: true },
    { id: '2', name: 'Lakshmi Devi', designation: 'Housekeeping', phone: '+91 98765 43221', salary: 18000, joinDate: '2023-02-01', isActive: true },
    { id: '3', name: 'Venkat Rao', designation: 'Gardener', phone: '+91 98765 43222', salary: 15000, joinDate: '2023-03-10', isActive: true },
    { id: '4', name: 'Sita Mahalakshmi', designation: 'Cleaning Staff', phone: '+91 98765 43223', salary: 12000, joinDate: '2023-04-05', isActive: true },
    { id: '5', name: 'Krishna Murthy', designation: 'Maintenance Helper', phone: '+91 98765 43224', salary: 20000, joinDate: '2023-05-20', isActive: true },
  ]);

  const [categories, setCategories] = useState([
    { id: '1', name: 'Maintenance', description: 'General maintenance and repairs', color: 'blue', isActive: true },
    { id: '2', name: 'Utilities', description: 'Electricity, water, gas bills', color: 'purple', isActive: true },
    { id: '3', name: 'Security', description: 'Security services and equipment', color: 'red', isActive: true },
    { id: '4', name: 'Gardening', description: 'Garden maintenance and landscaping', color: 'green', isActive: true },
    { id: '5', name: 'Cleaning', description: 'Cleaning services and supplies', color: 'cyan', isActive: true },
    { id: '6', name: 'Infrastructure', description: 'Major infrastructure improvements', color: 'indigo', isActive: true },
    { id: '7', name: 'Safety & Security', description: 'Fire safety, emergency equipment', color: 'orange', isActive: true },
    { id: '8', name: 'Amenities', description: 'Swimming pool, gym, community hall', color: 'pink', isActive: true },
  ]);

  const [newVendor, setNewVendor] = useState({
    name: '', contactPerson: '', phone: '', email: '', serviceType: '', gstin: ''
  });

  const [newEmployee, setNewEmployee] = useState({
    name: '', designation: '', phone: '', salary: '', joinDate: ''
  });

  const [newCategory, setNewCategory] = useState({
    name: '', description: '', color: 'blue'
  });

  const addVendor = () => {
    if (newVendor.name && newVendor.contactPerson) {
      const vendor = {
        id: Date.now().toString(),
        ...newVendor,
        salary: parseInt(newVendor.salary) || 0,
        isActive: true
      };
      setVendors([...vendors, vendor]);
      setNewVendor({ name: '', contactPerson: '', phone: '', email: '', serviceType: '', gstin: '' });
    }
  };

  const addEmployee = () => {
    if (newEmployee.name && newEmployee.designation) {
      const employee = {
        id: Date.now().toString(),
        ...newEmployee,
        salary: parseInt(newEmployee.salary) || 0,
        isActive: true
      };
      setEmployees([...employees, employee]);
      setNewEmployee({ name: '', designation: '', phone: '', salary: '', joinDate: '' });
    }
  };

  const addCategory = () => {
    if (newCategory.name) {
      const category = {
        id: Date.now().toString(),
        ...newCategory,
        isActive: true
      };
      setCategories([...categories, category]);
      setNewCategory({ name: '', description: '', color: 'blue' });
    }
  };

  const toggleVendorStatus = (id: string) => {
    setVendors(vendors.map(v => v.id === id ? { ...v, isActive: !v.isActive } : v));
  };

  const toggleEmployeeStatus = (id: string) => {
    setEmployees(employees.map(e => e.id === id ? { ...e, isActive: !e.isActive } : e));
  };

  const toggleCategoryStatus = (id: string) => {
    setCategories(categories.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const sections = [
    { id: 'vendors', name: 'Vendors', icon: Building },
    { id: 'employees', name: 'Employees', icon: Users },
    { id: 'categories', name: 'Categories', icon: Tag },
  ];

  const renderVendorsSection = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-4">Add New Vendor</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Vendor Name *"
            value={newVendor.name}
            onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Contact Person *"
            value={newVendor.contactPerson}
            onChange={(e) => setNewVendor({ ...newVendor, contactPerson: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={newVendor.phone}
            onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={newVendor.email}
            onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Service Type"
            value={newVendor.serviceType}
            onChange={(e) => setNewVendor({ ...newVendor, serviceType: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="GSTIN"
            value={newVendor.gstin}
            onChange={(e) => setNewVendor({ ...newVendor, gstin: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={addVendor}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Vendor</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GSTIN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vendors.map((vendor) => (
              <tr key={vendor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                    <div className="text-sm text-gray-500">{vendor.contactPerson}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{vendor.phone}</div>
                  <div className="text-sm text-gray-500">{vendor.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.serviceType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">{vendor.gstin}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    vendor.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {vendor.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-blue-600 hover:text-blue-700 p-1" title="Edit">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => toggleVendorStatus(vendor.id)}
                    className={`p-1 ${vendor.isActive ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}`}
                    title={vendor.isActive ? 'Deactivate' : 'Activate'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderEmployeesSection = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-4">Add New Employee</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Employee Name *"
            value={newEmployee.name}
            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Designation *"
            value={newEmployee.designation}
            onChange={(e) => setNewEmployee({ ...newEmployee, designation: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={newEmployee.phone}
            onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Monthly Salary"
            value={newEmployee.salary}
            onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            placeholder="Join Date"
            value={newEmployee.joinDate}
            onChange={(e) => setNewEmployee({ ...newEmployee, joinDate: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={addEmployee}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Employee</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.designation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{employee.salary.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.joinDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    employee.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {employee.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-blue-600 hover:text-blue-700 p-1" title="Edit">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => toggleEmployeeStatus(employee.id)}
                    className={`p-1 ${employee.isActive ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}`}
                    title={employee.isActive ? 'Deactivate' : 'Activate'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCategoriesSection = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-4">Add New Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Category Name *"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newCategory.color}
            onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="red">Red</option>
            <option value="purple">Purple</option>
            <option value="orange">Orange</option>
            <option value="cyan">Cyan</option>
            <option value="pink">Pink</option>
            <option value="indigo">Indigo</option>
          </select>
        </div>
        <button
          type="button"
          onClick={addCategory}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className={`p-4 rounded-lg border-2 ${
            category.isActive ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full bg-${category.color}-500`} />
                <h4 className={`font-medium ${category.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                  {category.name}
                </h4>
              </div>
              <div className="flex space-x-1">
                <button className="text-blue-600 hover:text-blue-700 p-1" title="Edit">
                  <Edit className="w-3 h-3" />
                </button>
                <button 
                  onClick={() => toggleCategoryStatus(category.id)}
                  className={`p-1 ${category.isActive ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}`}
                  title={category.isActive ? 'Deactivate' : 'Activate'}
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
            <p className={`text-sm ${category.isActive ? 'text-gray-600' : 'text-gray-400'}`}>
              {category.description}
            </p>
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mt-2 ${
              category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {category.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Master Data Management</h2>
        <p className="text-gray-600 mb-6">
          Manage vendors, employees, and expense categories. These will be available as dropdown options for treasurers.
        </p>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === section.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <section.icon className="w-4 h-4" />
            <span>{section.name}</span>
          </button>
        ))}
      </div>

      {/* Section Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {activeSection === 'vendors' && renderVendorsSection()}
        {activeSection === 'employees' && renderEmployeesSection()}
        {activeSection === 'categories' && renderCategoriesSection()}
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save All Changes</span>
        </button>
      </div>
    </div>
  );
};

export default MasterDataSettings;