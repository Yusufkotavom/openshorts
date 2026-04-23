import React, { useState } from 'react';
import { Youtube, Upload, FileVideo, X, Sparkles, Type } from 'lucide-react';

export default function MediaInput({ onProcess, isProcessing }) {
    const [mode, setMode] = useState('url'); // 'url' | 'file'
    const [url, setUrl] = useState('');
    const [file, setFile] = useState(null);

    // Automation defaults (server-side post-processing)
    const [autoSubtitle, setAutoSubtitle] = useState(false);
    const [autoHook, setAutoHook] = useState(false);
    const [hookText, setHookText] = useState('POV: kamu nemu clip paling lucu di video ini');

    const handleSubmit = (e) => {
        e.preventDefault();
        const options = {
            auto_subtitle: autoSubtitle,
            auto_hook: autoHook,
            hook_text: hookText,
        };
        if (mode === 'url' && url) {
            onProcess({ type: 'url', payload: url, options });
        } else if (mode === 'file' && file) {
            onProcess({ type: 'file', payload: file, options });
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setMode('file');
        }
    };

    return (
        <div className="bg-surface border border-white/5 rounded-2xl p-6 animate-[fadeIn_0.6s_ease-out]">
            <div className="flex gap-4 mb-6 border-b border-white/5 pb-4">
                <button
                    onClick={() => setMode('url')}
                    className={`flex items-center gap-2 pb-2 px-2 transition-all ${mode === 'url'
                        ? 'text-primary border-b-2 border-primary -mb-[17px]'
                        : 'text-zinc-400 hover:text-white'
                        }`}
                >
                    <Youtube size={18} />
                    YouTube URL
                </button>
                <button
                    onClick={() => setMode('file')}
                    className={`flex items-center gap-2 pb-2 px-2 transition-all ${mode === 'file'
                        ? 'text-primary border-b-2 border-primary -mb-[17px]'
                        : 'text-zinc-400 hover:text-white'
                        }`}
                >
                    <Upload size={18} />
                    Upload File
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                {mode === 'url' ? (
                    <div className="space-y-4">
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="input-field"
                            required
                        />
                    </div>
                ) : (
                    <div
                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${file ? 'border-primary/50 bg-primary/5' : 'border-zinc-700 hover:border-zinc-500 bg-white/5'
                            }`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                    >
                        {file ? (
                            <div className="flex items-center justify-center gap-3 text-white">
                                <FileVideo className="text-primary" />
                                <span className="font-medium">{file.name}</span>
                                <button
                                    type="button"
                                    onClick={() => setFile(null)}
                                    className="p-1 hover:bg-white/10 rounded-full"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <label className="cursor-pointer block">
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    className="hidden"
                                />
                                <Upload className="mx-auto mb-3 text-zinc-500" size={24} />
                                <p className="text-zinc-400">Click to upload or drag and drop</p>
                                <p className="text-xs text-zinc-600 mt-1">MP4, MOV up to 500MB</p>
                            </label>
                        )}
                    </div>
                )}

                {/* Automation (Server-Side) */}
                <div className="mt-6 p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Automation</div>

                    <label className="flex items-center justify-between gap-3 py-2">
                        <span className="text-sm text-zinc-200 flex items-center gap-2">
                            <Type size={16} className="text-zinc-400" />
                            Auto Subtitle (burn in)
                        </span>
                        <input
                            type="checkbox"
                            checked={autoSubtitle}
                            onChange={(e) => setAutoSubtitle(e.target.checked)}
                            className="h-4 w-4 accent-primary"
                        />
                    </label>

                    <label className="flex items-center justify-between gap-3 py-2">
                        <span className="text-sm text-zinc-200 flex items-center gap-2">
                            <Sparkles size={16} className="text-zinc-400" />
                            Auto Hook (overlay)
                        </span>
                        <input
                            type="checkbox"
                            checked={autoHook}
                            onChange={(e) => setAutoHook(e.target.checked)}
                            className="h-4 w-4 accent-primary"
                        />
                    </label>

                    {autoHook && (
                        <div className="mt-3 space-y-2">
                            <div className="text-xs text-zinc-500">Hook text</div>
                            <textarea
                                value={hookText}
                                onChange={(e) => setHookText(e.target.value)}
                                rows={2}
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white placeholder-zinc-600 focus:outline-none focus:border-primary/50 resize-none"
                                placeholder="POV: ..."
                            />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isProcessing || (mode === 'url' && !url) || (mode === 'file' && !file)}
                    className="w-full btn-primary mt-6 flex items-center justify-center gap-2"
                >
                    {isProcessing ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing Video...
                        </>
                    ) : (
                        <>
                            Generate Clips
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
