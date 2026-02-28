import { NavLink, Outlet } from 'react-router';
import { LayoutDashboard, FileText, ArrowLeftRight, Settings, Bot, ChevronRight } from 'lucide-react';

const navItems = [
  { path: '/', label: 'AI记账看板', icon: LayoutDashboard, end: true },
  { path: '/invoice', label: '发票标注', icon: FileText },
  { path: '/bankflow', label: '流水标注', icon: ArrowLeftRight },
  { path: '/rules', label: '规则管理', icon: Settings },
];

export function Layout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f0f2f5]">
      {/* Sidebar */}
      <aside className="w-[200px] bg-[#13254a] text-white flex flex-col flex-shrink-0 shadow-xl">
        {/* Logo */}
        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <Bot size={17} className="text-white" />
            </div>
            <div>
              <div className="text-sm text-white font-semibold leading-tight">AI记账标注</div>
              <div className="text-[10px] text-white/40 leading-tight mt-0.5">AI workbench</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2.5 space-y-0.5">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group
                ${isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                  : 'text-white/55 hover:bg-white/10 hover:text-white/90'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon size={16} className={isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'} />
                  <span className="flex-1">{item.label}</span>
                  {isActive && <ChevronRight size={12} className="text-white/60" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-3.5 border-t border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
              张
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-white/85 font-medium truncate">张三丰</div>
              <div className="text-[10px] text-white/40 truncate">财税产品经理</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
