const employees = [
  { id: "1", parentId: null, name: "Sarah Johnson", position: "Chief Executive Officer", department: "Executive", email: "sarah.j@company.com" },
  { id: "2", parentId: "1", name: "Alice Chen", position: "Chief Technology Officer", department: "Technology", email: "alice.c@company.com" },
  { id: "3", parentId: "1", name: "Bob Smith", position: "Chief Financial Officer", department: "Finance", email: "bob.s@company.com" },
  { id: "4", parentId: "2", name: "Charlie Wilson", position: "Engineering Manager", department: "Technology", email: "charlie.w@company.com" },
  { id: "5", parentId: "2", name: "David Brown", position: "Senior Developer", department: "Technology", email: "david.b@company.com" },
  { id: "6", parentId: "3", name: "Emma Davis", position: "Finance Manager", department: "Finance", email: "emma.d@company.com" },
  { id: "7", parentId: "4", name: "Frank Miller", position: "Frontend Developer", department: "Technology", email: "frank.m@company.com" },
  { id: "8", parentId: "4", name: "Grace Taylor", position: "Backend Developer", department: "Technology", email: "grace.t@company.com" },
    { id: "9", parentId: "4", name: "sam miller", position: "Backend Developer", department: "Technology", email: "grmiller.t@company.com" } ,
     { id: "10", parentId: "5", name: "Liam Scott", position: "Junior Developer", department: "Technology", email: "liam.s@company.com" },
  { id: "11", parentId: "5", name: "Olivia Green", position: "QA Engineer", department: "Technology", email: "olivia.g@company.com" },

];

export default employees;