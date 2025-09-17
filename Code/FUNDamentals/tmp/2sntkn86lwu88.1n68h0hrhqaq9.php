<div class="profile-header">
    <div class="header-content">
        <div class="header-text">
            <h1 class="profile-title">Profile & Settings</h1>
            <p class="profile-subtitle">Manage your account and personalize your learning experience</p>
        </div>
        <div class="profile-animation-container">
            <div class="lottie-profile-placeholder">
                <div class="profile-animation-fallback">
                    <span class="animation-icon">⚙️</span>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="profile-grid"> 
    <div class="profile-section account-section">
        <div class="section-header">
            <div class="section-icon">
                <span class="material-icons">account_circle</span>
            </div>
            <div class="section-title">
                <h3>Account Info</h3>
                <p>Your personal account details</p>
            </div>
        </div>
        
        <div class="form-container">
            <div class="form-field">
                <label class="field-label" for="username">
                    <span class="material-icons">person</span>
                    Username
                </label>
                <div class="input-wrapper disabled">
                    <input type="text" id="username" value="<?= ($user) ?>" disabled>
                    <div class="input-badge">Read-only</div>
                </div>
            </div>
            
            <div class="form-field">
                <label class="field-label" for="email">
                    <span class="material-icons">email</span>
                    Email Address
                </label>
                <div class="input-wrapper">
                    <input type="email" id="email" value="<?= ($email) ?>">
                </div>
            </div>
            
            <button class="btn-modern primary">
                <span class="material-icons">save</span>
                Update Email
            </button>
        </div>
    </div>
    
    <div class="profile-section preferences-section">
        <div class="section-header">
            <div class="section-icon">
                <span class="material-icons">tune</span>
            </div>
            <div class="section-title">
                <h3>Learning Preferences</h3>
                <p>Customize your learning journey</p>
            </div>
        </div>
        
        <div class="form-container">
            <div class="form-field">
                <label class="field-label" for="financial-goal">
                    <span class="material-icons">flag</span>
                    Financial Goal
                </label>
                <div class="select-wrapper">
                    <select id="financial-goal">
                        <option <?= ($goal == 'Budgeting Basics' ? 'selected' : '') ?>>Budgeting Basics</option>
                        <option <?= ($goal == 'Saving Hacks' ? 'selected' : '') ?>>Saving Hacks</option>
                        <option <?= ($goal == 'Investing' ? 'selected' : '') ?>>Investing</option>
                    </select>
                    <span class="material-icons select-arrow">expand_more</span>
                </div>
            </div>
            
            <div class="form-field">
                <label class="field-label" for="learning-style">
                    <span class="material-icons">psychology</span>
                    Learning Style
                </label>
                <div class="select-wrapper">
                    <select id="learning-style">
                        <option <?= ($learning_style == 'Visual' ? 'selected' : '') ?>>Visual</option>
                        <option <?= ($learning_style == 'Interactive' ? 'selected' : '') ?>>Interactive</option>
                        <option <?= ($learning_style == 'Reading' ? 'selected' : '') ?>>Reading</option>
                    </select>
                    <span class="material-icons select-arrow">expand_more</span>
                </div>
            
            
            <button class="btn-modern accent">
                <span class="material-icons">psychology</span>
                Update Preferences
            </button>
        </div>
    </div>
</div>

    <div class="profile-section danger-section">
        <div class="section-header">
            <div class="section-icon danger">
                <span class="material-icons">warning</span>
            </div>
            <div class="section-title">
                <h3>Danger Zone</h3>
                <p>Irreversible and destructive actions</p>
            </div>
        </div>
        
        <div class="danger-actions">
            <div class="danger-content">
                <div class="danger-info">
                    <div class="danger-title">Reset Progress</div>
                    <div class="danger-description">
                        Reset all module progress and quiz data. Your profile settings and name will be preserved.
                    </div>
                </div>
                <button class="btn-modern warning" disabled>
                    <span class="material-icons">refresh</span>
                    Reset Progress
                </button>
            </div>
            
            <div class="danger-content">
                <div class="danger-info">
                    <div class="danger-title">Delete Account</div>
                    <div class="danger-description">
                        Permanently delete your account and all associated data. This action cannot be undone.
                    </div>
                </div>
                <button class="btn-modern danger" disabled>
                    <span class="material-icons">delete_forever</span>
                    Delete Account
                </button>
            </div>
        </div>
    </div>
</div>
    
    <style>
    .profile-header {
        background: linear-gradient(135deg, #6236FF 0%, #FF6B35 100%) !important;
        color: white !important;
        padding: 0 2rem;
        border-radius: 16px;
        margin-bottom: 2rem;
        text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        height: 184px;
        display: flex;
        align-items: center;
    }
    
    .header-icon {
        width: 64px;
        height: 64px;
        background: linear-gradient(135deg, var(--primary) 0%, #8B5CF6 100%);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 2rem;
        box-shadow: 0 8px 24px rgba(98, 54, 255, 0.2);
    }
    
    .header-content h2 {
        margin: 0 0 8px 0;
        font-size: 2rem;
        font-weight: 700;
        color: white !important;
    }
    
    .header-description {
        margin: 0;
        color: rgba(255, 255, 255, 0.9) !important;
        font-size: 1.1rem;
    }
    
    .profile-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px;
        margin-bottom: 32px;
    }
    
    .additional-sections {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
    
    .profile-section {
        background: var(--card-bg);
        border-radius: var(--radius);
        padding: 32px;
        box-shadow: var(--shadow);
        transition: all var(--transition);
        border: 1px solid rgba(0, 0, 0, 0.04);
    }
    
    .profile-section:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 32px rgba(44, 44, 84, 0.12);
    }
    
    .section-header {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        margin-bottom: 28px;
    }
    
    .section-icon {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, var(--primary) 0%, #8B5CF6 100%);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.5rem;
        flex-shrink: 0;
    }
    
    .section-icon.danger {
        background: linear-gradient(135deg, #FF4444 0%, #DC3545 100%);
    }
    
    .section-title h3 {
        margin: 0 0 4px 0;
        font-size: 1.3rem;
        font-weight: 600;
        color: var(--text-main);
    }
    
    .section-title p {
        margin: 0;
        color: var(--text-secondary);
        font-size: 0.95rem;
    }
    
    .form-container {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
    
    .form-field {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    .field-label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        color: var(--text-main);
        font-size: 0.95rem;
    }
    
    .field-label .material-icons {
        font-size: 1.2rem;
        color: var(--text-secondary);
    }
    
    .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }
    
    .input-wrapper input {
        width: 100%;
        padding: 16px 20px;
        border: 2px solid #E5E7EB;
        border-radius: var(--radius-sm);
        font-size: 1rem;
        transition: all var(--transition);
        background: #fff;
        color: var(--text-main);
    }
    
    .input-wrapper input:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 4px rgba(98, 54, 255, 0.1);
    }
    
    .input-wrapper.disabled input {
        background: #F9FAFB;
        color: var(--text-secondary);
        cursor: not-allowed;
    }
    
    .input-badge {
        position: absolute;
        right: 16px;
        background: var(--text-secondary);
        color: white;
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 0.75rem;
        font-weight: 600;
    }
    
    .select-wrapper {
        position: relative;
    }
    
    .select-wrapper select {
        width: 100%;
        padding: 16px 50px 16px 20px;
        border: 2px solid #E5E7EB;
        border-radius: var(--radius-sm);
        font-size: 1rem;
        background: #fff;
        color: var(--text-main);
        cursor: pointer;
        transition: all var(--transition);
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
    
    .select-wrapper select:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 4px rgba(98, 54, 255, 0.1);
    }
    
    .select-arrow {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-secondary);
        pointer-events: none;
        transition: all var(--transition);
    }
    
    .select-wrapper:hover .select-arrow {
        color: var(--primary);
    }
    
    .btn-modern {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 16px 24px;
        border: none;
        border-radius: var(--radius-sm);
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all var(--transition);
        text-decoration: none;
        position: relative;
        overflow: hidden;
    }
    
    .btn-modern::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
    }
    
    .btn-modern:hover::before {
        left: 100%;
    }
    
    .btn-modern.primary {
        background: linear-gradient(135deg, var(--primary) 0%, #8B5CF6 100%);
        color: white;
        box-shadow: 0 4px 16px rgba(98, 54, 255, 0.3);
    }
    
    .btn-modern.primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(98, 54, 255, 0.4);
    }
    
    .btn-modern.accent {
        background: linear-gradient(135deg, var(--accent) 0%, #FF7849 100%);
        color: white;
        box-shadow: 0 4px 16px rgba(255, 92, 53, 0.3);
    }
    
    .btn-modern.accent:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(255, 92, 53, 0.4);
    }
    
    .btn-modern.secondary {
        background: #F3F4F6;
        color: var(--text-main);
        border: 2px solid #E5E7EB;
    }
    
    .btn-modern.secondary:hover {
        background: #E5E7EB;
        transform: translateY(-1px);
    }
    
    .btn-modern.danger {
        background: linear-gradient(135deg, #FF4444 0%, #DC3545 100%);
        color: white;
        box-shadow: 0 4px 16px rgba(255, 68, 68, 0.3);
    }
    
    .btn-modern.danger:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(255, 68, 68, 0.4);
    }
    
    .btn-modern.warning {
        background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
        color: white;
        border: none;
    }
    
    .btn-modern.warning:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(245, 158, 11, 0.4);
    }
    
    .btn-modern:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none !important;
        box-shadow: none !important;
    }
    
    .btn-modern:disabled::before {
        display: none;
    }
    
    .btn-modern:disabled:hover {
        transform: none !important;
        box-shadow: none !important;
    }
    
    .danger-actions {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    .danger-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 24px;
        padding: 24px;
        background: #FEF2F2;
        border: 1px solid #FECACA;
        border-radius: var(--radius-sm);
    }
    
    .danger-content:first-child {
        background: #FFFBEB;
        border: 1px solid #FDE68A;
    }
    
    .danger-info {
        flex: 1;
    }
    
    .danger-title {
        font-weight: 600;
        color: #DC2626;
        font-size: 1.1rem;
        margin-bottom: 4px;
    }
    
    .danger-content:first-child .danger-title {
        color: #D97706;
    }
    
    .danger-description {
        color: #7F1D1D;
        font-size: 0.95rem;
    }
    
    .danger-content:first-child .danger-description {
        color: #92400E;
    }
    

    
     @media (max-width: 1200px) {
         .profile-grid {
             grid-template-columns: 1fr;
             gap: 24px;
         }
     }
     
     @media (max-width: 900px) {
         .additional-sections {
             gap: 24px;
         }
         
         .danger-actions {
             gap: 16px;
         }
         
         .danger-content {
             flex-direction: column;
             align-items: flex-start;
             text-align: center;
         }
         

     }
    
    @media (max-width: 600px) {
        .profile-header {
            flex-direction: column;
            text-align: center;
            padding: 0 1rem;
            height: 120px;
        }
        
        .header-content h2 {
            font-size: 1.6rem;
        }
        
        .profile-section {
            padding: 24px;
        }
    }
    
    </style>
    
    <script>
    </script> 