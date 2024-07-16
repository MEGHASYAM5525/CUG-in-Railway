const Add_cug = require("../models/add_cug-model");

// Plan rates
const planRates = {
  A: 75,
  B: 60,
  C: 40,
};

const create = async (req, res) => {
  try {
    console.log(req.body);
    const {
      cugNo,
      empNo,
      firstName,
      designation,
      department,
      billUnit,
      allocation,
      operator,
      plan,
    } = req.body;
    const cugExist = await Add_cug.findOne({cugNo});
    if (cugExist) {
      return res.status(401).json({ message: "CUG No.  already exist" });
    }
    const employeerExist = await Add_cug.findOne({empNo});
    if (employeerExist) {
      return res.status(402).json({ message: "Employee No.  already exist" });
    }
    const userCreated = await Add_cug.create({
      cugNo,
      empNo,
      firstName,
      designation,
      department,
      billUnit,
      allocation,
      operator,
      plan,
      createdAt: new Date(),
    });
    return res.status(201).json({ msg: "Add_cug created successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to create Add_cug" });
  }
};

const getAllData = async (req, res) => {
  try {
    const allData = await Add_cug.find();
    if (!allData) {
      res.status(404).json({ message: "No data found" });
    }
    res.status(200).json({ allData });
  } catch (error) {
    console.log(error);
  }
};

const getPlansAndDepartments = async (req, res) => {
  try {
    const plansAndDepartments = await Add_cug.find({}, { plan: 1, department: 1 });
    res.json(plansAndDepartments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const saveDraft = async (req, res) => {
  try {
    const {
      cugNo,
      empNo,
      firstName,
      designation,
      department,
      billUnit,
      allocation,
      operator,
      plan,
    } = req.body;
    const draft = await Add_cug.create({
      cugNo,
      empNo,
      firstName,
      designation,
      department,
      billUnit,
      allocation,
      operator,
      plan,
      draft: true,
      createdAt: new Date(),
    });
    res.status(201).json({ msg: "Draft saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to save draft" });
  }
};

const getDraft = async (req, res) => {
  const draftId = req.params.draftId;
  try {
    const draft = await Add_cug.findById(draftId);
    if (!draft || !draft.draft) {
      res.status(404).json({ message: "Draft not found" });
    } else {
      res.status(200).json({ draft });
    }
  } catch (error) {
    console.log(error);
  }
};
const getPlanWiseBillReport = async (req, res) => {
  try {
    const plans = await Add_cug.distinct('plan');
    const planWiseBillReport = [];

    for (const plan of plans) {
      const employees = await Add_cug.find({ plan });
      const totalAmount = employees.reduce((acc, employee) => acc + planRates[employee.plan], 0);
      planWiseBillReport.push({
        plan,
        department: employees[0].department,
        totalAmount,
      });
    }

    res.json(planWiseBillReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllocationTotal= async(req,res)=>{
  try {
    // Fetch all CUG data from the database
    const cugData = await Add_cug.find({}, { allocation: 1, plan: 1 });

    // Calculate allocation totals
    const allocationTotals = {};
    cugData.forEach(({ allocation, plan }) => {
      const amount = planRates[plan];
      if (!allocationTotals[allocation]) {
        allocationTotals[allocation] = 0;
      }
      allocationTotals[allocation] += amount;
    });

    // Format the result
    const result = Object.keys(allocationTotals).map(allocation => ({
      allocation,
      totalAmount: allocationTotals[allocation],
    }));

    // Send the response
    res.json({ allocations: result });
  } catch (error) {
    console.error('Error fetching allocation totals:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
module.exports = { create, getAllData, getPlansAndDepartments, saveDraft, getDraft,getAllocationTotal };


// module.exports = { create, getAllData };
