(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ecofinds_frontend/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ecofinds_frontend/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const API_URL = 'http://localhost:8000/api';
// Create axios instance
const api = __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: API_URL,
    timeout: 10000
});
// Request interceptor to add auth token
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = "Token ".concat(token);
    }
    // Set content type based on data type
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    } else if (config.data && typeof config.data === 'object') {
        config.headers['Content-Type'] = 'application/json';
    }
    return config;
}, (error)=>{
    return Promise.reject(error);
});
// Response interceptor to handle errors
api.interceptors.response.use((response)=>response, (error)=>{
    var _error_response;
    if (((_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status) === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('refresh_token');
        // Only redirect if not already on login page
        if (window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
    } else if (error.code === 'NETWORK_ERROR' || !error.response) {
        console.error('Network error:', error);
    }
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = api;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ecofinds_frontend/src/lib/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authService",
    ()=>authService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ecofinds_frontend/src/lib/api.ts [app-client] (ecmascript)");
;
const authService = {
    async login (data) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/login/', data);
            const { token, user, refresh_token } = response.data;
            // Store token and user in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            if (refresh_token) {
                localStorage.setItem('refresh_token', refresh_token);
            }
            return response.data;
        } catch (error) {
            throw this.handleAuthError(error);
        }
    },
    async register (data) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/register/', data);
            const { token, user, refresh_token } = response.data;
            // Store token and user in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            if (refresh_token) {
                localStorage.setItem('refresh_token', refresh_token);
            }
            return response.data;
        } catch (error) {
            throw this.handleAuthError(error);
        }
    },
    async logout () {
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/logout/');
        } catch (error) {
            console.error('Logout error:', error);
        } finally{
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('refresh_token');
        }
    },
    async getProfile () {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/auth/profile/');
            const user = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error) {
            throw this.handleAuthError(error);
        }
    },
    async updateProfile (data) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put('/auth/profile/update/', data);
            const user = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error) {
            throw this.handleAuthError(error);
        }
    },
    async changePassword (data) {
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/change-password/', data);
        } catch (error) {
            throw this.handleAuthError(error);
        }
    },
    async requestPasswordReset (data) {
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/password-reset/', data);
        } catch (error) {
            throw this.handleAuthError(error);
        }
    },
    async confirmPasswordReset (data) {
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/password-reset-confirm/', data);
        } catch (error) {
            throw this.handleAuthError(error);
        }
    },
    async refreshToken () {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/refresh/', {
                refresh: refreshToken
            });
            const { access } = response.data;
            localStorage.setItem('token', access);
            return access;
        } catch (error) {
            this.logout();
            throw this.handleAuthError(error);
        }
    },
    getCurrentUser () {
        try {
            const userStr = localStorage.getItem('user');
            return userStr ? JSON.parse(userStr) : null;
        } catch (error) {
            console.error('Error parsing user data:', error);
            return null;
        }
    },
    getToken () {
        return localStorage.getItem('token');
    },
    isAuthenticated () {
        return !!this.getToken();
    },
    handleAuthError (error) {
        if (error && typeof error === 'object' && 'response' in error) {
            const { data } = error.response;
            // Handle field-specific errors
            if (data.non_field_errors) {
                return {
                    message: data.non_field_errors[0]
                };
            }
            // Handle specific field errors
            const fieldErrors = Object.keys(data).filter((key)=>Array.isArray(data[key]));
            if (fieldErrors.length > 0) {
                const field = fieldErrors[0];
                return {
                    message: data[field][0],
                    field,
                    code: error.response.status.toString()
                };
            }
            // Handle general error message
            if (data.detail) {
                return {
                    message: data.detail
                };
            }
            if (data.message) {
                return {
                    message: data.message
                };
            }
        }
        // Handle network errors
        if (error && typeof error === 'object' && 'code' in error && error.code === 'NETWORK_ERROR') {
            return {
                message: 'Network error. Please check your connection.'
            };
        }
        // Default error
        return {
            message: 'An unexpected error occurred. Please try again.'
        };
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ecofinds_frontend/src/contexts/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ecofinds_frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ecofinds_frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ecofinds_frontend/src/lib/auth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const useAuth = ()=>{
    _s();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
_s(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const AuthProvider = (param)=>{
    let { children } = param;
    _s1();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const initAuth = {
                "AuthProvider.useEffect.initAuth": async ()=>{
                    const token = __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].getToken();
                    if (token) {
                        try {
                            const userData = await __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].getProfile();
                            setUser(userData);
                        } catch (error) {
                            var _response;
                            console.error('Failed to get user profile:', error);
                            // If token is invalid, clear it and redirect to login
                            if (((_response = error.response) === null || _response === void 0 ? void 0 : _response.status) === 401) {
                                __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].logout();
                            }
                        }
                    }
                    setLoading(false);
                }
            }["AuthProvider.useEffect.initAuth"];
            initAuth();
        }
    }["AuthProvider.useEffect"], []);
    const login = async (username, password)=>{
        try {
            setError(null);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].login({
                username,
                password
            });
            setUser(response.user);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Login failed';
            setError(errorMessage);
            throw err;
        }
    };
    const register = async (data)=>{
        try {
            setError(null);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].register(data);
            setUser(response.user);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Registration failed';
            setError(errorMessage);
            throw err;
        }
    };
    const logout = async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].logout();
            setUser(null);
            setError(null);
        } catch (err) {
            console.error('Logout error:', err);
            // Still clear user data even if logout request fails
            setUser(null);
            setError(null);
        }
    };
    const updateProfile = async (data)=>{
        try {
            setError(null);
            const updatedUser = await __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].updateProfile(data);
            setUser(updatedUser);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Profile update failed';
            setError(errorMessage);
            throw err;
        }
    };
    const changePassword = async (data)=>{
        try {
            setError(null);
            await __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].changePassword(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Password change failed';
            setError(errorMessage);
            throw err;
        }
    };
    const clearError = ()=>{
        setError(null);
    };
    const value = {
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        isAuthenticated: !!user,
        error,
        clearError
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecofinds_frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/ecofinds_frontend/src/contexts/AuthContext.tsx",
        lineNumber: 132,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(AuthProvider, "PA9FxEY9xSNRrsSqaLtbYei52Hs=");
_c = AuthProvider;
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=ecofinds_frontend_src_e7ea5d3b._.js.map