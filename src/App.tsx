import { useState, useEffect, useRef, useCallback } from "react";
import { FaCarSide, FaGem, FaMobileAlt, FaMotorcycle, FaPaintRoller, FaShieldAlt, FaSprayCan } from "react-icons/fa";
import { FiInstagram, FiPhone } from "react-icons/fi";
import { GiWaterDrop } from "react-icons/gi";
import { MdOutlineCleaningServices } from "react-icons/md";
import { TbWind } from "react-icons/tb";

const ORANGE = "#FF6B00";

const IMG_CERAMIC = "https://images.unsplash.com/photo-1711513503808-53380d724182?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const IMG_WASH = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop";
const IMG_PPF = "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=900&auto=format&fit=crop";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');

*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
:root{
  --orange:#FF6B00;
  --og:#CC5500;
  --black:#08080A;
  --dark:#101012;
  --dark2:#181819;
  --dark3:#202022;
  --white:#F2F2F2;
  --gray:#7A7A7A;
  --gray2:#4A4A4A;
  --glow:rgba(255,107,0,0.35);
}

body{background:var(--black);color:var(--white);font-family:'Rajdhani',sans-serif;cursor:none;overflow-x:hidden;}

/* ─── CUSTOM CURSOR ─── */
#g33-cursor-ring{
  width:36px;height:36px;border:1.5px solid var(--orange);border-radius:50%;
  position:fixed;pointer-events:none;z-index:9999;
  transition:transform 0.15s cubic-bezier(.16,1,.3,1),opacity 0.2s,border-color 0.2s,width 0.2s,height 0.2s;
  transform:translate(-50%,-50%);
  mix-blend-mode:normal;
}
#g33-cursor-dot{
  width:5px;height:5px;background:var(--orange);border-radius:50%;
  position:fixed;pointer-events:none;z-index:10000;
  transition:transform 0.08s,opacity 0.2s,background 0.2s;
  transform:translate(-50%,-50%);
}
#g33-cursor-ring.hover{
  width:56px;height:56px;border-color:rgba(255,107,0,0.6);
  background:rgba(255,107,0,0.06);
}
#g33-cursor-ring.click{
  transform:translate(-50%,-50%) scale(0.75);
  background:rgba(255,107,0,0.15);
}
#g33-cursor-dot.hover{opacity:0;}
.cursor-text{
  position:fixed;pointer-events:none;z-index:9998;
  font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:2px;
  color:var(--orange);text-transform:uppercase;white-space:nowrap;
  transform:translate(-50%,-50%) translateY(28px);
  opacity:0;transition:opacity 0.2s;
}
.cursor-text.show{opacity:1;}

/* ─── LOADING BAR ─── */
.g33-bar{position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,var(--orange),#FFAA00,var(--orange));z-index:9999;transition:width .4s cubic-bezier(.16,1,.3,1);box-shadow:0 0 12px var(--orange);}

/* ─── NAV ─── */
.g33-nav{
  position:fixed;top:0;left:0;right:0;z-index:1000;
  padding:1rem 2.5rem;display:flex;align-items:center;justify-content:space-between;
  background:rgba(8,8,10,0.82);backdrop-filter:blur(24px) saturate(1.2);
  border-bottom:1px solid rgba(255,107,0,0.1);
  transition:padding 0.3s,background 0.3s;
}
.g33-nav.scrolled{padding:0.7rem 2.5rem;background:rgba(8,8,10,0.95);}
.g33-logo{font-family:'Bebas Neue',sans-serif;font-size:1.85rem;letter-spacing:4px;color:var(--white);text-decoration:none;}
.g33-logo span{color:var(--orange);}
.g33-logo-sub{font-size:0.55rem;color:var(--gray);letter-spacing:4px;line-height:1;font-family:'Share Tech Mono',monospace;}
.g33-links{display:flex;gap:2rem;list-style:none;align-items:center;}
.g33-links a{
  color:var(--gray);text-decoration:none;font-size:0.78rem;letter-spacing:2.5px;text-transform:uppercase;
  transition:color .25s;font-family:'Share Tech Mono',monospace;cursor:none;
  position:relative;padding-bottom:2px;
}
.g33-links a::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--orange);transition:width .3s;}
.g33-links a:hover::after,.g33-links a.active::after{width:100%;}
.g33-links a:hover,.g33-links a.active{color:var(--white);}
.g33-cta-nav{
  background:var(--orange)!important;color:var(--black)!important;
  padding:0.5rem 1.3rem!important;font-weight:700!important;
  clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
  letter-spacing:2px!important;font-family:'Rajdhani',sans-serif!important;
  transition:background 0.2s,transform 0.2s!important;
}
.g33-cta-nav::after{display:none!important;}
.g33-cta-nav:hover{background:#FF8C00!important;transform:translateY(-1px)!important;}

/* ─── HAMBURGER ─── */
.hamburger{display:none;flex-direction:column;gap:5px;cursor:none;background:none;border:none;padding:6px;}
.hamburger span{display:block;width:24px;height:1.5px;background:var(--white);transition:all 0.3s;}
.hamburger.open span:nth-child(1){transform:translateY(6.5px) rotate(45deg);}
.hamburger.open span:nth-child(2){opacity:0;transform:scaleX(0);}
.hamburger.open span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg);}
.mobile-menu{
  position:fixed;top:0;left:0;right:0;bottom:0;z-index:990;
  background:rgba(8,8,10,0.98);backdrop-filter:blur(20px);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2.5rem;
  opacity:0;pointer-events:none;transition:opacity 0.3s;
}
.mobile-menu.open{opacity:1;pointer-events:all;}
.mobile-menu a{
  font-family:'Bebas Neue',sans-serif;font-size:2.8rem;letter-spacing:4px;
  color:var(--white);text-decoration:none;transition:color 0.2s;
}
.mobile-menu a.active,.mobile-menu a:hover{color:var(--orange);}

/* ─── FLOAT BTN ─── */
.g33-float{
  position:fixed;bottom:1.8rem;right:1.8rem;z-index:900;
  background:var(--orange);color:var(--black);border:none;
  padding:0.85rem 1.7rem;font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:2.5px;
  cursor:none;clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);
  animation:floatBtn 3s ease-in-out infinite;
  box-shadow:0 5px 24px rgba(255,107,0,0.5),0 0 60px rgba(255,107,0,0.08);
}
@keyframes floatBtn{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}

/* ─── HERO ─── */
.g33-hero{position:relative;min-height:100vh;display:flex;flex-direction:column;justify-content:center;overflow:hidden;background:var(--black);}
.hero-noise{position:absolute;inset:0;opacity:0.03;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:200px 200px;pointer-events:none;z-index:1;}

/* 3D Perspective Grid */
.g33-grid3d{
  position:absolute;bottom:0;left:0;right:0;height:60%;
  background:
    repeating-linear-gradient(90deg,rgba(255,107,0,0.07) 0px,transparent 1px,transparent 59px,rgba(255,107,0,0.07) 60px),
    repeating-linear-gradient(0deg,rgba(255,107,0,0.07) 0px,transparent 1px,transparent 59px,rgba(255,107,0,0.07) 60px);
  transform:perspective(500px) rotateX(48deg);
  transform-origin:bottom center;
  animation:gridBreath 5s ease-in-out infinite;
  mask-image:linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
}
@keyframes gridBreath{0%,100%{opacity:0.6;}50%{opacity:1;}}

.hero-orb1{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(255,107,0,0.08) 0%,transparent 70%);top:-200px;right:-100px;animation:orbDrift 8s ease-in-out infinite;pointer-events:none;z-index:1;}
.hero-orb2{position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(255,107,0,0.05) 0%,transparent 70%);bottom:-100px;left:-100px;animation:orbDrift2 10s ease-in-out infinite;pointer-events:none;z-index:1;}
@keyframes orbDrift{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(-20px,20px) scale(1.1);}}
@keyframes orbDrift2{0%,100%{transform:translate(0,0);}50%{transform:translate(15px,-15px);}}

.g33-scan-lines{position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.025) 3px,rgba(0,0,0,0.025) 4px);pointer-events:none;z-index:3;}

.g33-hcontent{position:relative;z-index:5;padding:6rem 3rem 2rem;max-width:680px;}
.g33-htag{
  font-family:'Share Tech Mono',monospace;font-size:0.7rem;color:var(--orange);
  letter-spacing:4px;text-transform:uppercase;margin-bottom:1.2rem;
  display:flex;align-items:center;gap:0.7rem;
  animation:fadeUp 0.7s 0.2s both;
}
.g33-htag::before{content:'';width:24px;height:1px;background:var(--orange);}
.g33-htitle{
  font-family:'Bebas Neue',sans-serif;font-size:clamp(3.5rem,9vw,8.5rem);
  line-height:0.92;letter-spacing:1px;
  animation:fadeUp 0.7s 0.4s both;
}
.g33-htitle .acc{color:var(--orange);}
.g33-htitle .out{-webkit-text-stroke:1.5px var(--orange);color:transparent;}
.g33-hsub{font-size:1rem;color:var(--gray);margin:1.5rem 0 2.2rem;line-height:1.7;animation:fadeUp 0.7s 0.6s both;max-width:480px;}
.g33-hbtns{display:flex;gap:1rem;flex-wrap:wrap;animation:fadeUp 0.7s 0.8s both;}

@keyframes fadeUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}

/* Hero badges */
.hero-badges{
  position:absolute;z-index:5;right:3rem;bottom:6rem;
  display:flex;flex-direction:column;gap:0.8rem;
  animation:fadeUp 0.7s 1.2s both;
}
.hero-badge{
  background:rgba(255,107,0,0.06);border:1px solid rgba(255,107,0,0.2);
  padding:0.5rem 0.9rem;backdrop-filter:blur(12px);
  font-family:'Share Tech Mono',monospace;font-size:0.68rem;letter-spacing:2px;
  color:var(--orange);display:flex;align-items:center;gap:0.5rem;
}
.hero-badge-dot{width:6px;height:6px;background:var(--orange);border-radius:50%;animation:blink 1.5s ease-in-out infinite;}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:0.3;}}

/* ─── CAR 3D ─── */
.g33-car{
  position:absolute;right:-2%;bottom:8%;width:54%;max-width:700px;
  animation:carIn 1.2s 0.9s cubic-bezier(.16,1,.3,1) both;
  filter:drop-shadow(0 30px 70px rgba(255,107,0,0.22)) drop-shadow(0 0 120px rgba(255,107,0,0.05));
  transform-style:preserve-3d;
}
.car-wrapper{animation:carFloat 5s ease-in-out 2s infinite;}
@keyframes carIn{from{transform:translateX(180px) translateY(20px);opacity:0;}to{transform:translateX(0) translateY(0);opacity:1;}}
@keyframes carFloat{0%,100%{transform:translateY(0) rotateY(0deg);}25%{transform:translateY(-8px) rotateY(0.5deg);}75%{transform:translateY(-4px) rotateY(-0.5deg);}}

/* ─── BUTTONS ─── */
.btn-p{
  background:var(--orange);color:var(--black);border:none;
  padding:0.9rem 2.2rem;font-family:'Rajdhani',sans-serif;font-size:0.92rem;
  font-weight:700;letter-spacing:2.5px;text-transform:uppercase;cursor:none;
  clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%);
  transition:all .28s;text-decoration:none;display:inline-block;
  position:relative;overflow:hidden;
}
.btn-p::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transition:left 0.4s;}
.btn-p:hover::before{left:100%;}
.btn-p:hover{background:#FF8A00;transform:translateY(-2px);box-shadow:0 10px 28px rgba(255,107,0,0.4);}
.btn-o{
  background:transparent;color:var(--orange);border:1px solid var(--orange);
  padding:0.9rem 2.2rem;font-family:'Rajdhani',sans-serif;font-size:0.92rem;
  font-weight:700;letter-spacing:2.5px;text-transform:uppercase;cursor:none;
  clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%);
  transition:all .28s;display:inline-block;text-decoration:none;
}
.btn-o:hover{background:rgba(255,107,0,0.1);transform:translateY(-2px);box-shadow:0 0 20px rgba(255,107,0,0.15);}

/* ─── STATS ─── */
.g33-stats{
  position:relative;z-index:5;
  background:linear-gradient(90deg,var(--dark3),var(--dark2),var(--dark3));
  border-top:1px solid rgba(255,107,0,0.25);border-bottom:1px solid rgba(255,107,0,0.1);
  padding:1.8rem 3rem;display:grid;grid-template-columns:repeat(4,1fr);
}
.stat-item{text-align:center;padding:0 1rem;border-right:1px solid rgba(255,107,0,0.12);position:relative;}
.stat-item:last-child{border-right:none;}
.stat-item::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:1px;height:3px;background:var(--orange);box-shadow:0 0 8px var(--orange);}
.stat-num{
  font-family:'Bebas Neue',sans-serif;font-size:2.8rem;color:var(--orange);display:block;
  text-shadow:0 0 30px rgba(255,107,0,0.4);line-height:1;
}
.stat-label{font-size:0.72rem;color:var(--gray);letter-spacing:2.5px;text-transform:uppercase;font-family:'Share Tech Mono',monospace;}

/* ─── SECTION HELPERS ─── */
.sec-tag{
  font-family:'Share Tech Mono',monospace;font-size:0.7rem;color:var(--orange);
  letter-spacing:4px;text-transform:uppercase;margin-bottom:1rem;
  display:flex;align-items:center;gap:0.8rem;
}
.sec-tag::before{content:'//';opacity:0.6;}

/* ─── ABOUT ─── */
.g33-about{background:var(--dark);padding:7rem 3rem;position:relative;overflow:hidden;}
.about-bg-text{
  position:absolute;top:50%;left:-2%;transform:translateY(-50%);
  font-family:'Bebas Neue',sans-serif;font-size:18rem;color:rgba(255,107,0,0.02);
  letter-spacing:10px;pointer-events:none;white-space:nowrap;
}
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;max-width:1200px;margin:0 auto;}
.about-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.2rem,4.5vw,4rem);line-height:0.95;margin-bottom:1.8rem;}
.about-title .acc{color:var(--orange);}
.about-text{color:var(--gray);line-height:1.8;font-size:0.97rem;margin-bottom:1rem;}
.about-feats{display:grid;grid-template-columns:1fr 1fr;gap:0.8rem;margin-top:1.8rem;}
.feat-item{display:flex;align-items:center;gap:0.7rem;font-size:0.88rem;font-weight:600;letter-spacing:0.3px;}
.feat-diamond{
  width:9px;height:9px;background:var(--orange);flex-shrink:0;
  clip-path:polygon(50% 0%,100% 50%,50% 100%,0% 50%);
  animation:spinDiamond 4s linear infinite;
}
@keyframes spinDiamond{to{transform:rotate(360deg);}}

/* Image stack */
.img-stack{display:flex;flex-direction:column;gap:1rem;}
.img-card-3d{
  position:relative;overflow:hidden;height:158px;
  border:1px solid rgba(255,107,0,0.15);
  transform:perspective(800px) rotateY(0deg);
  transition:transform 0.4s,border-color 0.4s,box-shadow 0.4s;
}
.img-card-3d:hover{
  border-color:rgba(255,107,0,0.5);
  box-shadow:0 0 30px rgba(255,107,0,0.12),-4px 0 20px rgba(255,107,0,0.08);
  transform:perspective(800px) rotateY(-3deg) scale(1.01);
}
.img-card-3d img{width:100%;height:100%;object-fit:cover;transition:transform 0.5s;}
.img-card-3d:hover img{transform:scale(1.06);}
.img-card-label{
  position:absolute;bottom:0;left:0;right:0;
  background:linear-gradient(transparent,rgba(8,8,10,0.9));
  padding:0.7rem 1rem;font-family:'Bebas Neue',sans-serif;font-size:1.1rem;letter-spacing:2px;color:var(--orange);
}
.img-card-accent{position:absolute;top:0;left:0;width:3px;height:100%;background:linear-gradient(to bottom,var(--orange),transparent);}
.img-card-corner{position:absolute;top:8px;right:8px;width:20px;height:20px;border-top:1.5px solid rgba(255,107,0,0.5);border-right:1.5px solid rgba(255,107,0,0.5);}

/* ─── SERVICES PAGE ─── */
.page-hero{
  background:var(--dark);padding:5rem 3rem 4rem;
  position:relative;overflow:hidden;border-bottom:1px solid rgba(255,107,0,0.2);
}
.page-hero-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.6rem,6vw,5.5rem);line-height:1;max-width:800px;}
.page-hero-title span{color:var(--orange);}
.page-hero-sub{color:var(--gray);font-size:0.9rem;margin-top:0.8rem;font-family:'Share Tech Mono',monospace;letter-spacing:1px;}
.page-hero-scan{position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--orange),transparent);animation:scanPass 3s linear infinite;}
@keyframes scanPass{from{transform:scaleX(0);transform-origin:left;}to{transform:scaleX(1);transform-origin:right;}}

.svc-wrap{padding:5rem 3rem;max-width:1300px;margin:0 auto;}

/* Discount banner */
.disc-banner{
  background:var(--orange);color:var(--black);padding:1.6rem 2.5rem;
  display:flex;align-items:center;justify-content:space-between;margin-bottom:3.5rem;
  clip-path:polygon(0 0,calc(100% - 24px) 0,100% 100%,24px 100%);
  position:relative;overflow:hidden;gap:1rem;flex-wrap:wrap;
}
.disc-banner::after{
  content:'';position:absolute;inset:0;
  background:repeating-linear-gradient(45deg,transparent,transparent 12px,rgba(0,0,0,0.04) 12px,rgba(0,0,0,0.04) 24px);
}
.disc-num{font-family:'Bebas Neue',sans-serif;font-size:5rem;line-height:1;position:relative;z-index:1;text-shadow:2px 2px 0 rgba(0,0,0,0.1);}
.disc-text{font-family:'Bebas Neue',sans-serif;font-size:1.8rem;position:relative;z-index:1;}
.disc-text small{display:block;font-family:'Rajdhani',sans-serif;font-size:0.85rem;font-weight:600;letter-spacing:2px;}
.disc-cta{
  background:var(--black);color:var(--orange);border:none;
  padding:0.85rem 2rem;font-family:'Bebas Neue',sans-serif;font-size:1.15rem;letter-spacing:2px;
  cursor:none;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
  transition:all .3s;position:relative;z-index:1;text-decoration:none;display:inline-block;
}
.disc-cta:hover{transform:scale(1.04);box-shadow:0 0 20px rgba(255,107,0,0.3);}

/* Services grid with 3D hover */
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,107,0,0.08);margin-bottom:4rem;}
.svc-card{
  background:var(--dark);padding:2.2rem 1.6rem;position:relative;overflow:hidden;cursor:none;
  transition:transform 0.35s cubic-bezier(.16,1,.3,1),background 0.35s;
  transform-style:preserve-3d;
}
.svc-card::before{content:'';position:absolute;top:0;left:0;width:100%;height:2px;background:var(--orange);transform:scaleX(0);transform-origin:left;transition:transform 0.35s;}
.svc-card::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,rgba(255,107,0,0.06),transparent 70%);opacity:0;transition:opacity 0.35s;}
.svc-card:hover::before{transform:scaleX(1);}
.svc-card:hover::after{opacity:1;}
.svc-card:hover{transform:translateY(-5px) perspective(600px) rotateX(2deg);background:var(--dark2);}
.svc-num{font-family:'Bebas Neue',sans-serif;font-size:5rem;color:rgba(255,107,0,0.05);position:absolute;top:-5px;right:0.5rem;line-height:1;transition:color 0.4s,transform 0.4s;}
.svc-card:hover .svc-num{color:rgba(255,107,0,0.12);transform:translateY(-4px);}
.svc-icon{
  width:50px;height:50px;background:rgba(255,107,0,0.07);border:1px solid rgba(255,107,0,0.2);
  display:flex;align-items:center;justify-content:center;margin-bottom:1.3rem;
  clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
  font-size:1.4rem;transition:all .35s;position:relative;z-index:1;
}
.svc-card:hover .svc-icon{background:var(--orange);border-color:var(--orange);}
.svc-name{font-family:'Bebas Neue',sans-serif;font-size:1.4rem;margin-bottom:0.5rem;letter-spacing:1px;position:relative;z-index:1;}
.svc-desc{color:var(--gray);font-size:0.86rem;line-height:1.6;margin-bottom:1.2rem;position:relative;z-index:1;}
.svc-tag{
  display:inline-block;background:rgba(255,107,0,0.08);color:var(--orange);
  padding:0.22rem 0.75rem;font-size:0.7rem;font-family:'Share Tech Mono',monospace;
  letter-spacing:1.5px;border:1px solid rgba(255,107,0,0.15);position:relative;z-index:1;
}

/* Pricing */
.pricing-title{font-family:'Bebas Neue',sans-serif;font-size:2.3rem;margin-bottom:1.6rem;}
.pricing-title span{color:var(--orange);}
.price-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;margin-bottom:3.5rem;}
.price-card{
  background:var(--dark2);border:1px solid rgba(255,107,0,0.15);
  padding:2.2rem 1.7rem;text-align:center;position:relative;overflow:hidden;
  transition:all 0.4s cubic-bezier(.16,1,.3,1);
  transform-style:preserve-3d;
}
.price-card:hover{
  border-color:rgba(255,107,0,0.5);
  transform:translateY(-10px) perspective(600px) rotateX(3deg);
  box-shadow:0 20px 50px rgba(255,107,0,0.12),0 0 0 1px rgba(255,107,0,0.1);
}
.price-card.featured{border-color:rgba(255,107,0,0.4);background:linear-gradient(160deg,rgba(255,107,0,0.07) 0%,var(--dark2) 50%);}
.price-card.featured::before{
  content:'MOST POPULAR';position:absolute;top:1rem;right:-2.5rem;
  background:var(--orange);color:var(--black);font-size:0.58rem;letter-spacing:2px;
  padding:0.25rem 3.5rem;transform:rotate(35deg);font-family:'Share Tech Mono',monospace;font-weight:700;
}
.price-vehicle{font-size:0.72rem;color:var(--orange);letter-spacing:3px;text-transform:uppercase;font-family:'Share Tech Mono',monospace;margin-bottom:0.3rem;}
.price-type{font-family:'Bebas Neue',sans-serif;font-size:1.6rem;margin-bottom:1.2rem;}
.price-amount{font-family:'Bebas Neue',sans-serif;font-size:4rem;color:var(--orange);line-height:1;display:flex;align-items:flex-start;justify-content:center;gap:0.2rem;}
.price-cur{font-size:1.3rem;padding-top:0.4rem;opacity:0.8;}
.price-div{width:32px;height:1px;background:rgba(255,107,0,0.4);margin:1.2rem auto;}
.price-list{list-style:none;text-align:left;margin-bottom:1.6rem;}
.price-list li{padding:0.34rem 0;color:var(--gray);font-size:0.86rem;display:flex;align-items:center;gap:0.5rem;border-bottom:1px solid rgba(255,255,255,0.03);}
.price-list li::before{content:'▸';color:var(--orange);font-size:0.72rem;flex-shrink:0;}

/* PPF & Rain sections */
.ppf-sec{
  background:var(--dark);border:1px solid rgba(255,107,0,0.15);padding:2.6rem;margin-bottom:2rem;
  display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;
  transition:border-color 0.3s,box-shadow 0.3s;
}
.ppf-sec:hover{border-color:rgba(255,107,0,0.3);box-shadow:0 0 40px rgba(255,107,0,0.05);}
.ppf-title{font-family:'Bebas Neue',sans-serif;font-size:2.7rem;line-height:0.95;margin-bottom:0.8rem;}
.ppf-title span{color:var(--orange);}
.ppf-feats{display:grid;grid-template-columns:1fr 1fr;gap:0.7rem;margin-top:1.2rem;}
.ppf-feat{background:rgba(255,107,0,0.04);border-left:2px solid var(--orange);padding:0.65rem 0.8rem;font-size:0.86rem;font-weight:600;letter-spacing:0.3px;transition:background 0.2s;}
.ppf-feat:hover{background:rgba(255,107,0,0.08);}
.rain-sec{
  background:linear-gradient(135deg,var(--dark2) 0%,rgba(255,107,0,0.04) 100%);
  border:1px solid rgba(255,107,0,0.15);padding:2.6rem;
  display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;
}
.pills{display:flex;flex-wrap:wrap;gap:0.6rem;margin-top:1.2rem;}
.pill{
  background:rgba(255,107,0,0.07);border:1px solid rgba(255,107,0,0.2);color:var(--orange);
  padding:0.4rem 1rem;font-size:0.72rem;font-family:'Share Tech Mono',monospace;letter-spacing:1px;
  clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);
  transition:background 0.2s;
}
.pill:hover{background:rgba(255,107,0,0.15);}

/* img overlay */
.img-overlay-card{position:relative;overflow:hidden;border:1px solid rgba(255,107,0,0.2);}
.img-overlay-card img{width:100%;height:100%;object-fit:cover;transition:transform 0.5s;}
.img-overlay-card:hover img{transform:scale(1.04);}
.img-overlay-inner{position:absolute;inset:0;background:rgba(8,8,10,0.3);}

/* ─── CONTACT ─── */
.contact-wrap{display:grid;grid-template-columns:1fr 1fr;min-height:calc(100vh - 72px);}
.contact-left{
  background:var(--dark);padding:4.5rem 3.5rem;position:relative;overflow:hidden;
  border-right:1px solid rgba(255,107,0,0.2);
}
.contact-left::before{
  content:'CONTACT';position:absolute;bottom:-3rem;left:-1rem;
  font-family:'Bebas Neue',sans-serif;font-size:10rem;color:rgba(255,107,0,0.03);
  letter-spacing:5px;line-height:1;pointer-events:none;white-space:nowrap;
}
.contact-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.2rem,3.5vw,3.5rem);line-height:0.95;margin-bottom:1.2rem;}
.contact-title span{color:var(--orange);}
.contact-desc{color:var(--gray);line-height:1.7;margin-bottom:2.5rem;font-size:0.95rem;}
.info-block{display:flex;flex-direction:column;gap:1.2rem;margin-bottom:2.2rem;}
.info-row{display:flex;align-items:flex-start;gap:1.1rem;padding:0.8rem;transition:background 0.2s;border:1px solid transparent;}
.info-row:hover{background:rgba(255,107,0,0.03);border-color:rgba(255,107,0,0.1);}
.info-icon{
  width:44px;height:44px;background:rgba(255,107,0,0.08);border:1px solid rgba(255,107,0,0.2);
  display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;
  clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);transition:all .3s;
}
.info-row:hover .info-icon{background:var(--orange);}
.info-label{font-size:0.65rem;color:var(--orange);letter-spacing:2.5px;text-transform:uppercase;font-family:'Share Tech Mono',monospace;margin-bottom:0.15rem;}
.info-val{font-size:0.93rem;font-weight:600;letter-spacing:0.3px;}
.info-val a{color:var(--white);text-decoration:none;}
.info-val a:hover{color:var(--orange);}
.hours-block{background:var(--dark2);border-left:2px solid var(--orange);padding:1.3rem 1.4rem;}
.hours-title{font-family:'Bebas Neue',sans-serif;font-size:1.1rem;color:var(--orange);letter-spacing:2px;margin-bottom:0.8rem;}
.hours-row{display:flex;justify-content:space-between;font-size:0.86rem;padding:0.33rem 0;border-bottom:1px solid rgba(255,255,255,0.04);}
.hours-row:last-child{border-bottom:none;}
.hours-day{color:var(--gray);}
.hours-time{font-weight:600;}

.contact-right{background:var(--black);padding:4.5rem 3.5rem;display:flex;flex-direction:column;justify-content:center;}
.form-title{font-family:'Bebas Neue',sans-serif;font-size:2.3rem;margin-bottom:0.3rem;}
.form-title span{color:var(--orange);}
.form-sub{color:var(--gray);font-size:0.82rem;margin-bottom:2rem;font-family:'Share Tech Mono',monospace;letter-spacing:1px;}
.form-group{margin-bottom:1.2rem;}
.form-group label{display:block;font-size:0.65rem;letter-spacing:3px;text-transform:uppercase;color:var(--orange);font-family:'Share Tech Mono',monospace;margin-bottom:0.4rem;}
.form-group input,.form-group select,.form-group textarea{
  width:100%;background:var(--dark2);border:1px solid rgba(255,107,0,0.15);color:var(--white);
  padding:0.8rem 1rem;font-family:'Rajdhani',sans-serif;font-size:0.95rem;outline:none;
  transition:all .25s;border-radius:0;appearance:none;
}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{
  border-color:var(--orange);background:rgba(255,107,0,0.04);
  box-shadow:0 0 0 2px rgba(255,107,0,0.08);
}
.form-group textarea{resize:none;height:100px;}
.form-group select option{background:var(--dark2);color:var(--white);}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem;}
.form-submit{
  background:var(--orange);color:var(--black);border:none;
  padding:1rem 3rem;font-family:'Bebas Neue',sans-serif;font-size:1.2rem;letter-spacing:3px;
  cursor:none;clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%);
  transition:all .28s;width:100%;margin-top:0.3rem;position:relative;overflow:hidden;
}
.form-submit::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transition:left 0.4s;}
.form-submit:hover::before{left:100%;}
.form-submit:hover{background:#FF8A00;transform:translateY(-2px);box-shadow:0 10px 28px rgba(255,107,0,0.4);}
.form-success{
  background:rgba(255,107,0,0.06);border:1px solid rgba(255,107,0,0.4);
  padding:1.5rem;text-align:center;font-family:'Bebas Neue',sans-serif;
  font-size:1.4rem;letter-spacing:2px;color:var(--orange);animation:successPop 0.5s cubic-bezier(.16,1,.3,1);
}
@keyframes successPop{from{opacity:0;transform:scale(0.95);}to{opacity:1;transform:scale(1);}}

/* Map */
.map-section{background:var(--dark2);border-top:1px solid rgba(255,107,0,0.15);padding:2.8rem;}
.map-ph{
  background:var(--dark);border:1px solid rgba(255,107,0,0.15);height:260px;
  display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;margin-top:1.2rem;
}
.map-grid{
  position:absolute;inset:0;
  background:
    repeating-linear-gradient(90deg,rgba(255,107,0,0.04) 0px,transparent 1px,transparent 49px,rgba(255,107,0,0.04) 50px),
    repeating-linear-gradient(0deg,rgba(255,107,0,0.04) 0px,transparent 1px,transparent 49px,rgba(255,107,0,0.04) 50px);
}
.map-pin{
  width:44px;height:44px;background:var(--orange);border-radius:50% 50% 50% 0;
  transform:rotate(-45deg);margin:0 auto 1rem;
  box-shadow:0 0 0 0 rgba(255,107,0,0.4);
  animation:mapPulse 2s ease-in-out infinite;
}
@keyframes mapPulse{0%{box-shadow:0 0 0 0 rgba(255,107,0,0.5);}70%{box-shadow:0 0 0 18px rgba(255,107,0,0);}100%{box-shadow:0 0 0 0 rgba(255,107,0,0);}}
.map-addr{font-family:'Share Tech Mono',monospace;font-size:0.78rem;color:var(--orange);letter-spacing:1px;text-align:center;line-height:1.6;}

/* ─── PARTICLES ─── */
.particle{position:absolute;width:2px;height:2px;background:var(--orange);border-radius:50%;animation:floatUp linear infinite;opacity:0;pointer-events:none;}
@keyframes floatUp{0%{transform:translateY(100vh) translateX(0);opacity:0;}10%{opacity:0.7;}90%{opacity:0.2;}100%{transform:translateY(-10vh) translateX(var(--drift,30px));opacity:0;}}

/* ─── FOOTER ─── */
footer{
  background:var(--dark);border-top:1px solid rgba(255,107,0,0.15);
  padding:2.2rem 3rem;display:grid;grid-template-columns:1fr 2fr 1fr;gap:2rem;align-items:center;
}
.f-logo{font-family:'Bebas Neue',sans-serif;font-size:1.8rem;letter-spacing:3px;}
.f-logo span{color:var(--orange);}
.f-logo-sub{font-size:0.6rem;color:var(--gray);letter-spacing:3.5px;margin-top:0.2rem;font-family:'Share Tech Mono',monospace;}
.f-links{display:flex;justify-content:center;gap:2rem;list-style:none;}
.f-links a{color:var(--gray);text-decoration:none;font-size:0.74rem;letter-spacing:2px;text-transform:uppercase;font-family:'Share Tech Mono',monospace;transition:color .25s;cursor:none;}
.f-links a:hover{color:var(--orange);}
.f-social{display:flex;gap:0.7rem;justify-content:flex-end;}
.social-btn{
  width:36px;height:36px;background:rgba(255,107,0,0.07);border:1px solid rgba(255,107,0,0.2);
  display:flex;align-items:center;justify-content:center;font-size:0.9rem;cursor:none;
  transition:all .3s;text-decoration:none;color:var(--orange);
}
.social-btn:hover{background:var(--orange);color:var(--black);transform:translateY(-2px);}
.f-bottom{
  background:var(--black);border-top:1px solid rgba(255,107,0,0.06);
  padding:1rem 3rem;display:flex;justify-content:space-between;align-items:center;
  font-size:0.68rem;color:rgba(120,120,120,0.5);font-family:'Share Tech Mono',monospace;letter-spacing:1px;
}

/* ─── SCROLL REVEAL ─── */
.reveal{opacity:0;transform:translateY(32px);transition:opacity 0.7s cubic-bezier(.16,1,.3,1),transform 0.7s cubic-bezier(.16,1,.3,1);}
.reveal.visible{opacity:1;transform:translateY(0);}
.reveal-left{opacity:0;transform:translateX(-32px);transition:opacity 0.7s cubic-bezier(.16,1,.3,1),transform 0.7s cubic-bezier(.16,1,.3,1);}
.reveal-left.visible{opacity:1;transform:translateX(0);}
.reveal-right{opacity:0;transform:translateX(32px);transition:opacity 0.7s cubic-bezier(.16,1,.3,1),transform 0.7s cubic-bezier(.16,1,.3,1);}
.reveal-right.visible{opacity:1;transform:translateX(0);}

/* ─── MOBILE ─── */
@media(max-width:900px){
  .g33-links{display:none;}
  .hamburger{display:flex;}
  .g33-car{width:88%;right:-5%;bottom:2%;opacity:0.45;}
  .g33-hcontent{padding:5rem 1.5rem 2rem;}
  .g33-stats{grid-template-columns:repeat(2,1fr);padding:1.5rem 1rem;}
  .stat-item:nth-child(2){border-right:none;}
  .stat-item:nth-child(3){border-right:1px solid rgba(255,107,0,0.12);}
  .about-grid{grid-template-columns:1fr;gap:2.5rem;}
  .img-stack{display:grid;grid-template-columns:repeat(3,1fr);gap:0.6rem;}
  .img-card-3d{height:130px;}
  .g33-about{padding:4rem 1.5rem;}
  .svc-grid{grid-template-columns:1fr 1fr;}
  .price-cards{grid-template-columns:1fr;}
  .ppf-sec,.rain-sec{grid-template-columns:1fr;gap:1.5rem;}
  .contact-wrap{grid-template-columns:1fr;}
  .contact-left{border-right:none;border-bottom:1px solid rgba(255,107,0,0.2);padding:3rem 1.5rem;}
  .contact-right{padding:3rem 1.5rem;}
  .form-row{grid-template-columns:1fr;}
  footer{grid-template-columns:1fr;gap:1.5rem;text-align:center;padding:2rem 1.5rem;}
  .f-links{flex-wrap:wrap;gap:1.2rem;}
  .f-social{justify-content:center;}
  .f-bottom{flex-direction:column;gap:0.5rem;text-align:center;padding:1rem 1.5rem;}
  .svc-wrap{padding:3rem 1.5rem;}
  .page-hero{padding:4rem 1.5rem 3rem;}
  .g33-float{bottom:1.2rem;right:1.2rem;font-size:0.88rem;padding:0.7rem 1.3rem;}
  .disc-banner{flex-direction:column;align-items:flex-start;clip-path:none;}
  .hero-badges{display:none;}
}
@media(max-width:600px){
  .svc-grid{grid-template-columns:1fr;}
  .g33-nav{padding:0.8rem 1.2rem;}
  .g33-stats{grid-template-columns:repeat(2,1fr);}
  .about-feats{grid-template-columns:1fr;}
  .ppf-feats{grid-template-columns:1fr;}
  .map-section{padding:2rem 1.2rem;}
}
`;

function useCounter(target, suffix = "", delay = 1600) {
  const [val, setVal] = useState("0" + suffix);
  useEffect(() => {
    const t = setTimeout(() => {
      let cur = 0;
      const step = target / 55;
      const id = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(id); }
        setVal(Math.floor(cur) + suffix);
      }, 22);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(t);
  }, [target, suffix, delay]);
  return val;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal,.reveal-left,.reveal-right");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const delay = e.target.dataset.delay || 0;
          setTimeout(() => e.target.classList.add("visible"), Number(delay));
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ── Custom Cursor ──────────────────────────────────────────────────────────
function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const textRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    const textEl = textRef.current;
    if (!dot || !ringEl) return;

    let raf;
    const onMove = e => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    };
    const onDown = () => { ringEl.classList.add("click"); dot.style.transform = "translate(-50%,-50%) scale(0.6)"; };
    const onUp = () => { ringEl.classList.remove("click"); dot.style.transform = "translate(-50%,-50%) scale(1)"; };

    const onEnter = e => {
      const el = e.target.closest("a,button,.svc-card,.price-card,.img-card-3d,.btn-p,.btn-o");
      if (el) {
        ringEl.classList.add("hover");
        dot.classList.add("hover");
        const label = el.dataset.cursor;
        if (label && textEl) { textEl.textContent = label; textEl.classList.add("show"); }
      }
    };
    const onLeave = e => {
      const el = e.target.closest("a,button,.svc-card,.price-card,.img-card-3d,.btn-p,.btn-o");
      if (el) {
        ringEl.classList.remove("hover");
        dot.classList.remove("hover");
        if (textEl) textEl.classList.remove("show");
      }
    };

    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      ringEl.style.left = ring.current.x + "px";
      ringEl.style.top = ring.current.y + "px";
      if (textEl) { textEl.style.left = ring.current.x + "px"; textEl.style.top = ring.current.y + "px"; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <>
      <div id="g33-cursor-ring" ref={ringRef} />
      <div id="g33-cursor-dot" ref={dotRef} />
      <div className="cursor-text" ref={textRef} />
    </>
  );
}

// ── Particles ──────────────────────────────────────────────────────────────
function Particles({ count = 18 }) {
  const pts = useRef(Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    dur: 5 + Math.random() * 8,
    delay: Math.random() * 8,
    size: 1.5 + Math.random() * 2,
    drift: (Math.random() - 0.5) * 60,
  }))).current;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {pts.map((p, i) => (
        <div key={i} className="particle" style={{
          left: p.left + "%",
          animationDuration: p.dur + "s",
          animationDelay: p.delay + "s",
          width: p.size + "px",
          height: p.size + "px",
          "--drift": p.drift + "px",
        }} />
      ))}
    </div>
  );
}

// ── Car SVG ────────────────────────────────────────────────────────────────
function CarSVG() {
  return (
    <div className="g33-car">
      <div className="car-wrapper">
        <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bodyG" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#FF7A00"/>
      <stop offset="40%" stopColor="#CC3D00"/>
      <stop offset="100%" stopColor="#0A0A0A"/>
    </linearGradient>

    <linearGradient id="glassG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#7FDBFF" stopOpacity="0.25"/>
      <stop offset="100%" stopColor="#0077aa" stopOpacity="0.1"/>
    </linearGradient>

    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.3"/>
      <stop offset="100%" stopColor="#FF6B00" stopOpacity="0"/>
    </radialGradient>

    <filter id="blurGlow">
      <feGaussianBlur stdDeviation="8" />
    </filter>
  </defs>

  {/* Ground glow */}
  <ellipse cx="400" cy="340" rx="300" ry="25" fill="url(#glow)" filter="url(#blurGlow)" />

  {/* SUPER CAR BODY (LOW + SHARP) */}
  <path d="
    M80 260
    L140 210
    L260 170
    L420 155
    L560 165
    L680 210
    L740 250
    L740 285
    L80 285 Z
  " fill="url(#bodyG)" />

  {/* Sharp top line */}
  <path d="M140 210 L260 170 L420 155 L560 165 L680 210"
        stroke="#FF8C00" strokeWidth="2" opacity="0.6"/>

  {/* Cabin (supercar style small glass) */}
  <path d="
    M300 170
    L360 130
    L460 125
    L520 140
    L560 165
    L420 160 Z
  " fill="url(#glassG)" stroke="rgba(255,107,0,0.4)" />

  {/* Aggressive front */}
  <path d="M700 230 L770 245 L760 270 L720 260 Z"
        fill="rgba(255,200,120,0.5)" />

  {/* Rear diffuser */}
  <rect x="80" y="265" width="660" height="20" fill="rgba(0,0,0,0.6)" />

  {/* Wheels */}
  {[240, 600].map((cx, i) => (
    <g key={i}>
      <circle cx={cx} cy="285" r="60" fill="#0a0a0a"/>
      <circle cx={cx} cy="285" r="50" stroke="#FF6B00" strokeWidth="2" fill="#111"/>
      <circle cx={cx} cy="285" r="25" fill="rgba(255,107,0,0.5)"/>

      {/* sport spokes */}
      {[0,60,120].map(a => {
        const r = a * Math.PI / 180;
        return (
          <line
            key={a}
            x1={cx}
            y1={285}
            x2={cx + Math.cos(r)*40}
            y2={285 + Math.sin(r)*40}
            stroke="#FF6B00"
            strokeWidth="3"
          />
        );
      })}
    </g>
  ))}

  {/* LED strip headlight */}
  <rect x="700" y="245" width="40" height="5" fill="#FFD580" />

  {/* Speed lines */}
  {[0,1,2,3].map(i => (
    <line key={i}
      x1="0"
      y1={200 + i*15}
      x2="70"
      y2={200 + i*15}
      stroke="rgba(255,107,0,0.1)"
      strokeWidth="2"
    />
  ))}

</svg>
      </div>
    </div>
  );
}

// ── NavBar ─────────────────────────────────────────────────────────────────
function NavBar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const nav = (p) => { setPage(p); setMobileOpen(false); };

  return (
    <>
      <nav className={`g33-nav${scrolled ? " scrolled" : ""}`}>
        <div>
          <div className="g33-logo">GARAGE<span>33</span></div>
          <div className="g33-logo-sub">AUTOMOTIVE · ERODE</div>
        </div>

        <ul className="g33-links">
          {["home", "services", "contact"].map(p => (
            <li key={p}>
              <a
                href="#"
                className={page === p ? "active" : ""}
                onClick={e => {
                  e.preventDefault();
                  setPage(p);
                }}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </a>
            </li>
          ))}

          <li>
            <a href="tel:9976458080" className="g33-cta-nav">
              <button style={{ marginRight: "6px" }} />
              Book Now
            </a>
          </li>
        </ul>

        <button
          className={`hamburger${mobileOpen ? " open" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu${mobileOpen ? " open" : ""}`}>
        {["home", "services", "contact"].map(p => (
          <a
            key={p}
            href="#"
            className={page === p ? "active" : ""}
            onClick={e => {
              e.preventDefault();
              nav(p);
            }}
          >
            {p.toUpperCase()}
          </a>
        ))}

        <a href="tel:9976458080" style={{ color: ORANGE, display: "flex", alignItems: "center", gap: "6px" }}>
          <FiPhone />
          9976458080
        </a>
      </div>
    </>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <>
      <footer>
        <div>
          <div className="f-logo">GARAGE<span>33</span></div>
          <div className="f-logo-sub">AUTOMOTIVE · EST. ERODE</div>
        </div>

        <ul className="f-links">
          {["home", "services", "contact"].map(p => (
            <li key={p}>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setPage(p);
                }}
              >
                {p.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>

        <div className="f-social">
          <a href="tel:9976458080" className="social-btn" title="Call">
            <FiPhone/>
          </a>

          <a href="tel:9942158080" className="social-btn" title="Call 2">
            <FaMobileAlt />
          </a>

          <a href="#" className="social-btn" title="Instagram">
            <FiInstagram />
          </a>
        </div>
      </footer>

      <div className="f-bottom">
        <span>© 2025 GARAGE33 AUTOMOTIVE — ALL RIGHTS RESERVED</span>
        <span>213/3 KALAPARAIKADU, LAKKAPURAM, ERODE-638002</span>
      </div>
    </>
  );
}

// ── Home Page ──────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  useReveal();
  const s1 = useCounter(5000, "+");
  const s2 = useCounter(2500, "+");
  const s3 = useCounter(15, "+");
  const s4 = useCounter(13, "");

  return (
    <div>
      <section className="g33-hero">
        <div className="hero-noise" />
        <div className="g33-grid3d" />
        <div className="hero-orb1" />
        <div className="hero-orb2" />
        <div className="g33-scan-lines" />
        <Particles />

        <div className="g33-hcontent">
          <div className="g33-htag">GARAGE33 AUTOMOTIVE · ERODE</div>
          <h1 className="g33-htitle">
            YOUR<br />
            CAR <span className="acc">DESERVES</span><br />
            <span className="out">THE BEST</span>
          </h1>
          <p className="g33-hsub">Premium car care — wash, detailing, PPF, ceramic coating & accessories. Pickup & drop across Erode.</p>
          <div className="g33-hbtns">
            <button className="btn-p" onClick={() => setPage("services")} data-cursor="EXPLORE">Our Services</button>
            <button className="btn-o" onClick={() => setPage("contact")} data-cursor="BOOK">Book Appointment</button>
          </div>
        </div>

        <CarSVG />

        <div className="hero-badges">
          {[
            { dot: true, text: "FREE PICKUP & DROP" },
            { dot: true, text: "25% OFF ALL SERVICES" },
            { dot: false, text: "CERTIFIED TECHNICIANS" },
          ].map((b, i) => (
            <div key={i} className="hero-badge">
              {b.dot && <div className="hero-badge-dot" />}
              {b.text}
            </div>
          ))}
        </div>
      </section>

      <div className="g33-stats">
        {[
          { num: s1, label: "Cars Serviced" },
          { num: s2, label: "Happy Clients" },
          { num: s3, label: "Expert Techs" },
          { num: s4, label: "Services" },
        ].map((s, i) => (
          <div key={i} className="stat-item">
            <span className="stat-num">{s.num}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <section className="g33-about">
        <div className="about-bg-text">GARAGE33</div>
        <div className="about-grid">
          <div className="reveal-left">
            <div className="sec-tag">ABOUT US</div>
            <h2 className="about-title">
              PASSION FOR<br />
              <span className="acc">AUTOMOTIVE</span><br />
              EXCELLENCE
            </h2>
            <p className="about-text">Garage33 Automotive is Erode's premier car care destination. We combine cutting-edge technology with skilled craftsmanship to deliver unmatched results for every vehicle.</p>
            <p className="about-text">From foam car washes to advanced ceramic coatings, PPF installations, and full interior detailing — we treat every car as our own.</p>
            <div className="about-feats">
              {["State-of-art equipment", "Trained technicians", "Premium products only", "Free pickup & drop", "All vehicle types", "Satisfaction guaranteed"].map((f, i) => (
                <div key={i} className="feat-item"><div className="feat-diamond" />{f}</div>
              ))}
            </div>
            <button className="btn-p" style={{ marginTop: "1.8rem" }} onClick={() => setPage("services")} data-cursor="VIEW">Explore Services</button>
          </div>

          <div className="img-stack reveal-right">
            {[
              { src: IMG_WASH, label: "FOAM CAR WASH" },
              { src: IMG_CERAMIC, label: "CERAMIC COATING" },
              { src: IMG_PPF, label: "PAINT PROTECTION FILM" },
            ].map((img, i) => (
              <div key={i} className="img-card-3d" data-delay={i * 120}>
                <div className="img-card-accent" />
                <div className="img-card-corner" />
                <img src={img.src} alt={img.label} onError={e => { e.target.style.display = "none"; }} />
                <div className="img-card-label">{img.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
}

// ── Services Page ──────────────────────────────────────────────────────────
function ServicesPage({ setPage }) {
  useReveal();
 const services = [
  { icon: <FaSprayCan/>, name: "CAR WASH", desc: "Premium foam wash for hatchbacks, sedans & SUVs. Free pickup & drop.", tag: "FROM ₹399" },

  { icon: <MdOutlineCleaningServices />, name: "INTERIOR DETAILING", desc: "Deep cleaning — seats, dashboard, carpets, vents & more.", tag: "PREMIUM" },

  { icon: <FaShieldAlt />, name: "PAINT PROTECTION FILM", desc: "Invisible armor against road grime, UV damage, scratches & rust.", tag: "RECOMMENDED" },

  { icon: <FaGem />, name: "CERAMIC COATING", desc: "Long-lasting ceramic & graphene coatings that repel water, dirt & UV.", tag: "POPULAR" },

  { icon: <FaPaintRoller />, name: "PAINT CORRECTION", desc: "Remove swirl marks, scratches & oxidation. Restore original shine.", tag: "SPECIALIST" },

  { icon: <GiWaterDrop />, name: "RAIN REPELLENT", desc: "Ultra hydrophobic windscreen treatment for clear visibility.", tag: "SAFETY" },

  { icon: <TbWind />, name: "SUN FILMS", desc: "Premium window tinting for heat reduction, UV protection & privacy.", tag: "COMFORT" },

  { icon: <FaCarSide />, name: "MORE SERVICES", desc: "Underbody coating, caliper painting, headlight restoration, ozone treatment & accessories.", tag: "FULL SUITE" },

  { icon: <FaMotorcycle />, name: "BIKE DETAILING", desc: "Premium bike wash and detailing. Ceramic coatings for motorcycles too.", tag: "BIKES TOO" },
];

  return (
    <div>
      <div className="page-hero">
        <Particles count={10} />
        <div className="sec-tag" style={{ position: "relative", zIndex: 2 }}>OUR SERVICES</div>
        <h1 className="page-hero-title" style={{ position: "relative", zIndex: 2 }}>EXPERT CARE FOR <span>EVERY</span> VEHICLE</h1>
        <p className="page-hero-sub" style={{ position: "relative", zIndex: 2 }}>// 25% OFF ON ALL SERVICES — CALL 9976458080</p>
        <div className="page-hero-scan" />
      </div>

      <div className="svc-wrap">
        <div className="disc-banner reveal">
          <div className="disc-num">25%</div>
          <div className="disc-text">OFF ALL SERVICES<small>LIMITED TIME OFFER — BOOK YOUR SLOT TODAY</small></div>
          <a href="tel:9976458080" className="disc-cta" data-cursor="CALL">BOOK NOW →</a>
        </div>

        {/* Image grid */}
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "0.8rem", marginBottom: "3rem" }}>
          {[
            { src: IMG_WASH, label: "FOAM WASH" },
            { src: IMG_CERAMIC, label: "CERAMIC COATING" },
            { src: IMG_PPF, label: "PPF PROTECTION" },
          ].map((img, i) => (
            <div key={i} style={{ position: "relative", height: "190px", overflow: "hidden", border: "1px solid rgba(255,107,0,0.2)", transition: "transform 0.4s,box-shadow 0.4s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(255,107,0,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
              <img src={img.src} alt={img.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                onMouseEnter={e => e.target.style.transform = "scale(1.07)"}
                onMouseLeave={e => e.target.style.transform = ""}
                onError={e => { e.target.parentNode.style.background = "#1a1a1a"; }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent,rgba(8,8,10,0.9))", padding: "0.6rem 0.9rem" }}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1rem", letterSpacing: "2px", color: ORANGE }}>{img.label}</span>
              </div>
              <div style={{ position: "absolute", top: 0, left: 0, width: "2px", height: "100%", background: `linear-gradient(to bottom,${ORANGE},transparent)` }} />
            </div>
          ))}
        </div>

        {/* Services grid */}
        <div className="svc-grid reveal">
          {services.map((s, i) => (
            <div key={i} className="svc-card" style={i === 8 ? { background: "rgba(255,107,0,0.04)", borderTop: `1px solid rgba(255,107,0,0.2)` } : {}}>
              <div className="svc-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="svc-icon">{s.icon}</div>
              <div className="svc-name">{s.name}</div>
              <p className="svc-desc">{s.desc}</p>
              <span className="svc-tag">{s.tag}</span>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <h2 className="pricing-title reveal">FOAM CAR WASH <span>PRICING</span></h2>
        <div className="price-cards">
          {[
            { vehicle: "HATCHBACK", price: "399", items: ["Exterior foam wash", "Wheel cleaning", "Interior vacuum", "Glass wipe", "Free pickup & drop"] },
            { vehicle: "SEDAN", price: "499", featured: true, items: ["Exterior foam wash", "Wheel + tyre cleaning", "Interior vacuum + wipe", "Dashboard treatment", "Free pickup & drop"] },
            { vehicle: "SUV / MUV", price: "599", items: ["Exterior foam wash", "Wheel + underbody rinse", "Full interior vacuum", "Dashboard + console", "Free pickup & drop"] },
          ].map((c, i) => (
            <div key={i} className={`price-card reveal${c.featured ? " featured" : ""}`} data-delay={i * 100}>
              <div className="price-vehicle">{c.vehicle}</div>
              <div className="price-type">FOAM WASH</div>
              <div className="price-amount"><span className="price-cur">₹</span>{c.price}</div>
              <div className="price-div" />
              <ul className="price-list">{c.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
              <a href="tel:9976458080" className="btn-p" style={{ display: "block", textAlign: "center" }} data-cursor="BOOK">BOOK SLOT</a>
            </div>
          ))}
        </div>

        {/* PPF */}
        <div className="ppf-sec reveal">
          <div>
            <div className="sec-tag">PAINT PROTECTION</div>
            <h2 className="ppf-title">PAINT<br /><span>PROTECTION</span><br />FILM</h2>
            <p style={{ color: "var(--gray)", lineHeight: 1.7, fontSize: "0.95rem" }}>Keep your car's paint factory fresh. PPF shields against all road hazards with an invisible, self-healing layer.</p>
            <div className="ppf-feats">
              {["Road Grime", "Water Spots", "UV Damage", "Scratches", "Rust Prevention", "Self-Healing"].map((f, i) => (
                <div key={i} className="ppf-feat">{f}</div>
              ))}
            </div>
            <a href="tel:9942158080" className="btn-p" style={{ display: "inline-block", marginTop: "1.4rem" }} data-cursor="CALL">GET QUOTE: 9942158080</a>
          </div>
          <div className="img-overlay-card" style={{ height: "260px" }}>
            <img src={IMG_PPF} alt="PPF" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div className="img-overlay-inner" />
            <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", background: `linear-gradient(to bottom,${ORANGE},transparent)` }} />
            <div style={{ position: "absolute", bottom: "1rem", left: "1rem", fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.3rem", letterSpacing: "2px", color: ORANGE }}>INVISIBLE PROTECTION</div>
          </div>
        </div>

        {/* Rain */}
        <div className="rain-sec reveal">
          <div>
            <div className="sec-tag">WINDSCREEN CARE</div>
            <h2 className="ppf-title">RAIN<br /><span>REPELLENT</span></h2>
            <p style={{ color: "var(--gray)", lineHeight: 1.7, marginTop: "0.5rem", fontSize: "0.95rem" }}>Ultra hydrophobic coating for crystal clear visibility in any weather condition.</p>
            <div className="pills">
              {["CLEAR WINDSCREEN", "ENHANCES VISIBILITY", "UV PROTECTION", "ULTRA HYDROPHOBIC", "LONG LASTING"].map((p, i) => (
                <div key={i} className="pill">{p}</div>
              ))}
            </div>
            <a href="tel:9976458080" className="btn-p" style={{ display: "inline-block", marginTop: "1.4rem" }} data-cursor="CALL">CALL 9976458080</a>
          </div>
          <div className="img-overlay-card" style={{ height: "230px" }}>
            <img src={IMG_WASH} alt="Car Wash" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(8,8,10,0.55),rgba(8,8,10,0.1))" }} />
            <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", background: `linear-gradient(to bottom,${ORANGE},transparent)` }} />
            <div style={{ position: "absolute", bottom: "1rem", left: "1rem", fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.3rem", letterSpacing: "2px", color: ORANGE }}>HYDROPHOBIC SHIELD</div>
          </div>
        </div>
      </div>

      <Footer setPage={setPage} />
    </div>
  );
}

// ── Contact Page ───────────────────────────────────────────────────────────
function ContactPage({ setPage }) {
  useReveal();
  const [form, setForm] = useState({ name: "", phone: "", vehicle: "", service: "", date: "", notes: "" });
  const [status, setStatus] = useState("idle");

  function submit() {
    if (!form.name || !form.phone) { alert("Please enter your name and phone."); return; }
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1200);
  }

  return (
    <div>
      <div className="contact-wrap">
        <div className="contact-left">
          <div className="sec-tag">GET IN TOUCH</div>
          <h1 className="contact-title">LET'S TAKE<br />CARE OF<br />YOUR <span>CAR</span></h1>
          <p className="contact-desc">Book an appointment or call directly. Free pickup & drop across Erode.</p>
          <div className="info-block">
            {[
              { icon: "📍", label: "ADDRESS", val: <>213/3, Kalaparaikadu, Parisal Thurai Nall Road,<br />Lakkapuram, Erode — 638002</> },
              { icon: "📞", label: "PHONE", val: <><a href="tel:9976458080">+91 99764 58080</a><br /><a href="tel:9942158080">+91 99421 58080</a></> },
              { icon: "🚗", label: "PICKUP & DROP", val: "Free across Erode" },
            ].map((r, i) => (
              <div key={i} className="info-row">
                <div className="info-icon">{r.icon}</div>
                <div><div className="info-label">{r.label}</div><div className="info-val">{r.val}</div></div>
              </div>
            ))}
          </div>
          <div className="hours-block">
            <div className="hours-title">WORKING HOURS</div>
            {[["Monday — Friday", "8:00 AM — 8:00 PM"], ["Saturday", "8:00 AM — 8:00 PM"], ["Sunday", "9:00 AM — 6:00 PM"]].map(([d, t], i) => (
              <div key={i} className="hours-row"><span className="hours-day">{d}</span><span className="hours-time">{t}</span></div>
            ))}
          </div>
        </div>

        <div className="contact-right">
          <h2 className="form-title">BOOK YOUR <span>SLOT</span></h2>
          <p className="form-sub">// FILL OUT THE FORM AND WE'LL CALL YOU BACK</p>

          {status === "success" ? (
            <div className="form-success">✓ BOOKING RECEIVED! WE'LL CALL YOU SHORTLY.</div>
          ) : (
            <>
              <div className="form-row">
                <div className="form-group"><label>Your Name</label><input type="text" placeholder="e.g. Ravi Kumar" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div className="form-group"><label>Phone Number</label><input type="tel" placeholder="+91 99XXX XXXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Vehicle Type</label>
                  <select value={form.vehicle} onChange={e => setForm({ ...form, vehicle: e.target.value })}>
                    <option value="">Select vehicle</option>
                    {["Hatchback", "Sedan", "SUV / MUV", "Bike / Scooter"].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Service Required</label>
                  <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                    <option value="">Select service</option>
                    {["Premium Car Wash", "Interior Deep Cleaning", "Paint Protection Film", "Ceramic Coating", "Paint Correction", "Underbody Coating", "Sun Films", "Rain Repellent", "Caliper Painting", "Headlight Restoration", "Ozone Treatment", "Accessories"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group"><label>Preferred Date</label><input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></div>
              <div className="form-group"><label>Additional Notes</label><textarea placeholder="Any specific requirements or vehicle details..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></div>
              <button className="form-submit" onClick={submit} data-cursor={status === "loading" ? "..." : "SEND"}>
                {status === "loading" ? "BOOKING..." : "BOOK MY APPOINTMENT →"}
              </button>
            </>
          )}
        </div>
      </div>

    <div className="map-container" style={{ position: "relative" }}>
  <iframe
    src="https://www.google.com/maps?q=8Q58+Q9+Erode&output=embed"
    width="100%"
    height="400"
    style={{ border: 0, borderRadius: "12px" }}
    loading="lazy"
    title="Garage33 Location"
  />

</div>

      <Footer setPage={setPage} />
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPageState] = useState("home");
  const [barW, setBarW] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  function setPage(p) {
    if (p === page || transitioning) return;
    setTransitioning(true);
    setBarW(55);
    setTimeout(() => setBarW(100), 220);
    setTimeout(() => {
      setBarW(0);
      setPageState(p);
      window.scrollTo({ top: 0, behavior: "instant" });
      setTransitioning(false);
    }, 450);
  }

  return (
    <>
      <style>{css}</style>
      <CustomCursor />
      <div className="g33-bar" style={{ width: barW + "%" }} />
      <NavBar page={page} setPage={setPage} />
      <button className="g33-float" onClick={() => setPage("contact")} data-cursor="BOOK">BOOK NOW</button>

      <div style={{
        paddingTop: page === "home" ? 0 : "72px",
        opacity: transitioning ? 0 : 1,
        transition: "opacity 0.25s"
      }}>
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "services" && <ServicesPage setPage={setPage} />}
        {page === "contact" && <ContactPage setPage={setPage} />}
      </div>
    </>
  );
}