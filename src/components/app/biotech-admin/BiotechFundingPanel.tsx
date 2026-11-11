import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type {
  BudgetAllocation,
  DashboardSession,
  PurchaseRequisition,
} from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';

interface BiotechFundingPanelProps {
  session: DashboardSession;
  budgets: BudgetAllocation[];
  requisitions: PurchaseRequisition[];
  onSaveBudget: (budget: BudgetAllocation, editIndex: number | null) => void;
  onDeleteBudget: (idx: number, dept: string) => void;
  onAddRequisition: (po: PurchaseRequisition) => void;
  onReviewRequisition: (poId: string, decision: 'Approved' | 'Rejected') => void;
}

export const BiotechFundingPanel: React.FC<BiotechFundingPanelProps> = ({
  session,
  budgets,
  requisitions,
  onSaveBudget,
  onDeleteBudget,
  onAddRequisition,
  onReviewRequisition,
}) => {
  const [budgetModalOpen, setBudgetModalOpen] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [budgetForm, setBudgetForm] = useState({
    department: '',
    grantCode: 'NIH-NEW-01',
    allocatedUsd: '250000',
    spentUsd: '45000',
    reagentBurnUsd: '12000',
    instrumentHoursBilled: '120',
  });

  const [poOpen, setPoOpen] = useState(false);
  const [poVendor, setPoVendor] = useState('Thermo Fisher Scientific');
  const [poItem, setPoItem] = useState('');
  const [poDept, setPoDept] = useState(budgets[0]?.department ?? 'Functional Genomics');
  const [poAmount, setPoAmount] = useState('8500');

  const chartData = budgets.map((b) => ({
    ...b,
    shortDept: b.department.split(' ')[0],
  }));

  const openCreateBudget = () => {
    setEditingIdx(null);
    setBudgetForm({
      department: '',
      grantCode: 'NIH-NEW-01',
      allocatedUsd: '250000',
      spentUsd: '45000',
      reagentBurnUsd: '12000',
      instrumentHoursBilled: '120',
    });
    setBudgetModalOpen(true);
  };

  const openEditBudget = (b: BudgetAllocation, idx: number) => {
    setEditingIdx(idx);
    setBudgetForm({
      department: b.department,
      grantCode: b.grantCode,
      allocatedUsd: String(b.allocatedUsd),
      spentUsd: String(b.spentUsd),
      reagentBurnUsd: String(b.reagentBurnUsd ?? 10000),
      instrumentHoursBilled: String(b.instrumentHoursBilled ?? 100),
    });
    setBudgetModalOpen(true);
  };

  const handleBudgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!budgetForm.department.trim()) return;
    onSaveBudget(
      {
        department: budgetForm.department.trim(),
        grantCode: budgetForm.grantCode.trim() || 'INTERNAL',
        allocatedUsd: Math.max(1000, Number(budgetForm.allocatedUsd) || 100000),
        spentUsd: Math.max(0, Number(budgetForm.spentUsd) || 0),
        reagentBurnUsd: Math.max(0, Number(budgetForm.reagentBurnUsd) || 0),
        instrumentHoursBilled: Math.max(0, Number(budgetForm.instrumentHoursBilled) || 0),
      },
      editingIdx
    );
    setBudgetModalOpen(false);
  };

  const handlePoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!poItem.trim()) return;
    const deptBudget = budgets.find((b) => b.department === poDept);
    onAddRequisition({
      id: `PO-2026-${815 + requisitions.length}`,
      vendor: poVendor.trim() || 'Fisher BioReagents',
      itemDescription: poItem.trim(),
      department: poDept,
      grantCode: deptBudget?.grantCode ?? 'INTERNAL',
      amountUsd: Math.max(100, Number(poAmount) || 1000),
      status: 'Pending',
      requestedBy: session.userName,
    });
    setPoItem('');
    setPoOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Paper
        elevation={0}
        sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
      >
        <DashboardSectionHeader
          title="Grants, Reagent Burn & Instrument Hour Billing"
          subtitle="Manage department allocations, monthly reagent consumption, and instrument hours"
          moduleRef="2.2"
          actionLabel="Add Grant Budget"
          actionIcon={<AddIcon fontSize="small" />}
          onAction={openCreateBudget}
        />

        <Box sx={{ width: '100%', height: { xs: 210, sm: 240 }, mb: 3 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="shortDept" tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} tickFormatter={(v) => `$${v / 1000}k`} />
              <RechartsTooltip />
              <Bar dataKey="allocatedUsd" name="Allocated ($)" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="spentUsd" name="Spent ($)" fill="#1E40AF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' },
            gap: 2,
            '& > *': { minWidth: 0 },
          }}
        >
          {budgets.map((b, idx) => {
            const pct = Math.min(100, Math.round((b.spentUsd / Math.max(b.allocatedUsd, 1)) * 100));
            return (
              <Box key={`${b.department}-${idx}`} sx={{ p: 2, borderRadius: '8px', border: '1px solid #E2E8F0', bgcolor: '#F8FAFC' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75, flexWrap: 'wrap', gap: 0.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                    {b.department}
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', fontFamily: 'var(--font-mono)' }}>
                    {b.grantCode}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#334155', fontWeight: 700, mb: 1 }}>
                  ${b.spentUsd.toLocaleString()} spent of ${b.allocatedUsd.toLocaleString()} ({pct}%)
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={pct}
                  sx={{ height: 6, borderRadius: 3, mb: 1.25, bgcolor: '#E2E8F0', '& .MuiLinearProgress-bar': { bgcolor: '#1E40AF' } }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                  <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                    <Chip size="small" label={`Reagent Burn: $${((b.reagentBurnUsd ?? 0) / 1000).toFixed(1)}k/mo`} sx={{ height: 20, bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 700, fontSize: '10.5px', borderRadius: '4px' }} />
                    <Chip size="small" label={`${b.instrumentHoursBilled ?? 0} Inst. Hrs`} sx={{ height: 20, bgcolor: '#FFFFFF', border: '1px solid #CBD5E1', fontWeight: 700, fontSize: '10.5px', borderRadius: '4px' }} />
                  </Box>
                  <Box>
                    <IconButton size="small" onClick={() => openEditBudget(b, idx)} aria-label={`Edit ${b.department}`}>
                      <EditIcon fontSize="small" sx={{ color: '#1E40AF' }} />
                    </IconButton>
                    <IconButton size="small" onClick={() => onDeleteBudget(idx, b.department)} aria-label={`Delete ${b.department}`}>
                      <DeleteOutlineIcon fontSize="small" sx={{ color: '#DC2626' }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Paper>

      {/* Vendor Purchase Requisitions (PRD 2.2) */}
      <Paper
        elevation={0}
        sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
      >
        <DashboardSectionHeader
          title="Vendor Purchase Requisitions"
          subtitle="Approve reagent, sequencing kit, and consumable POs against department grants"
          moduleRef="2.2"
          actionLabel="New Requisition"
          actionIcon={<ShoppingCartIcon fontSize="small" />}
          onAction={() => setPoOpen(true)}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          {requisitions.map((po) => (
            <Box
              key={po.id}
              sx={{
                p: 1.5,
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                bgcolor: '#F8FAFC',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'stretch', sm: 'center' },
                gap: 1.25,
              }}
            >
              <Box sx={{ minWidth: 0, flex: { xs: 'none', sm: '1 1 220px' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', fontFamily: 'var(--font-mono)' }}>
                    {po.id} · {po.vendor}
                  </Typography>
                  <StatusChip label={po.status} />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', mt: 0.25, wordBreak: 'break-word' }}>
                  {po.itemDescription}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  {po.department} ({po.grantCode}) · Requested by {po.requestedBy}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', fontVariantNumeric: 'tabular-nums' }}>
                  ${po.amountUsd.toLocaleString()}
                </Typography>
                {po.status === 'Pending' && (
                  <>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<CheckIcon fontSize="small" />}
                      onClick={() => onReviewRequisition(po.id, 'Approved')}
                      sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}
                    >
                      Approve
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      startIcon={<CloseIcon fontSize="small" />}
                      onClick={() => onReviewRequisition(po.id, 'Rejected')}
                      sx={{ fontWeight: 700, borderRadius: '6px' }}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Budget CRUD Modal */}
      <Dialog open={budgetModalOpen} onClose={() => setBudgetModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>{editingIdx !== null ? 'Edit Budget Line' : 'Add Grant Budget'}</DialogTitle>
        <form onSubmit={handleBudgetSubmit}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Department" size="small" fullWidth required value={budgetForm.department} onChange={(e) => setBudgetForm({ ...budgetForm, department: e.target.value })} />
            <TextField label="Grant Code" size="small" fullWidth value={budgetForm.grantCode} onChange={(e) => setBudgetForm({ ...budgetForm, grantCode: e.target.value })} />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.25 }}>
              <TextField label="Allocated (USD)" type="number" size="small" fullWidth value={budgetForm.allocatedUsd} onChange={(e) => setBudgetForm({ ...budgetForm, allocatedUsd: e.target.value })} />
              <TextField label="Spent (USD)" type="number" size="small" fullWidth value={budgetForm.spentUsd} onChange={(e) => setBudgetForm({ ...budgetForm, spentUsd: e.target.value })} />
              <TextField label="Reagent Burn ($/mo)" type="number" size="small" fullWidth value={budgetForm.reagentBurnUsd} onChange={(e) => setBudgetForm({ ...budgetForm, reagentBurnUsd: e.target.value })} />
              <TextField label="Instrument Hours" type="number" size="small" fullWidth value={budgetForm.instrumentHoursBilled} onChange={(e) => setBudgetForm({ ...budgetForm, instrumentHoursBilled: e.target.value })} />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setBudgetModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}>
              {editingIdx !== null ? 'Save Budget' : 'Add Budget'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* New Purchase Requisition Modal */}
      <Dialog open={poOpen} onClose={() => setPoOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Create Vendor Purchase Requisition</DialogTitle>
        <form onSubmit={handlePoSubmit}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Vendor" size="small" fullWidth value={poVendor} onChange={(e) => setPoVendor(e.target.value)} />
            <TextField label="Reagent / Kit Description" size="small" fullWidth required value={poItem} onChange={(e) => setPoItem(e.target.value)} />
            <TextField select label="Department Grant" size="small" fullWidth value={poDept} onChange={(e) => setPoDept(e.target.value)}>
              {budgets.map((b) => (
                <MenuItem key={b.department} value={b.department}>
                  {b.department} ({b.grantCode})
                </MenuItem>
              ))}
            </TextField>
            <TextField label="Amount (USD)" type="number" size="small" fullWidth value={poAmount} onChange={(e) => setPoAmount(e.target.value)} />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setPoOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}>
              Submit PO
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
