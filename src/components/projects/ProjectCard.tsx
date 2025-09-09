"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScreenshotImageBlur from "../ui/ScreenShotWithProgress";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, ExternalLink, Eye, Info } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useLocale } from "next-intl";

const ProjectCard = ({
  title,
  description,
  link,
  technologies = [],
  status = "active",
  statusText,
}: {
  title: string;
  description: string;
  link: string;
  technologies: string[];
  status?: "active" | "in-active";
  statusText: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const locale = useLocale();

  // Truncate description for card display
  const truncatedDescription =
    description.length > 50
      ? description.substring(0, 50) + "..."
      : description;

  const shouldShowReadMore = description.length > 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm mx-auto"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="max-w-sm lg:min-w-[320px]  group relative overflow-hidden bg-card/80 text-card-foreground backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        {/* Status Badge */}
        <div
          className={`absolute top-4 z-20 ${
            locale === "en" ? "right-4" : "left-4"
          }`}
        >
          <Badge
            variant={status === "active" ? "default" : "secondary"}
            className={`${
              status === "active"
                ? "bg-primary hover:bg-primary/80 text-primary-foreground"
                : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }  text-xs px-2 py-1`}
          >
            {statusText}
          </Badge>
        </div>

        {/* Header with Title */}
        <div className="px-6 py-2">
          <motion.h3
            className="text-xl font-bold  mb-2 group-hover:text-accent transition-colors duration-300"
            animate={{ scale: isHovered ? 1.02 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.h3>

          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {technologies.slice(0, 3).map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs px-2 py-0.5 bg-popover border-border text-popover-foreground"
                >
                  {tech}
                </Badge>
              ))}
              {technologies.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs px-2 py-0.5 bg-background border-border text-foreground"
                >
                  +{technologies.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>

        <CardContent className="p-0">
          {/* Screenshot Section */}
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <ScreenshotImageBlur
                link={link}
                title={title}
                className="w-full h-40 rounded-none"
              />

              {/* Hover Overlay */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                  ></motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Description Section */}
          <div className="p-6 pt-4">
            <p className="text-card-foreground text-sm leading-relaxed mb-4">
              {truncatedDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-2">
                {shouldShowReadMore && (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer hover:bg-muted hover:border-border hover:text-muted-foreground transition-colors"
                      >
                        <Info className="w-4 h-4 mr-1" />
                        {locale === "en"
                          ? "more"
                          : locale === "fa"
                          ? "بیشتر"
                          : "أكثر"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      dir={locale === "en" ? "ltr" : "rtl"}
                      className="max-w-2xl bg-card z-[99] border-border text-card-foreground max-h-[80vh] 
                    overflow-y-auto scrollbar-hide"
                    >
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold  mb-2">
                          {title}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        {/* Screenshot in Dialog */}
                        <div className="w-full h-64 rounded-lg overflow-hidden">
                          <ScreenshotImageBlur
                            link={link}
                            title={title}
                            className="w-full h-full"
                          />
                        </div>

                        {/* Full Description */}
                        <div className="prose prose-sm max-w-none">
                          <p className="text-card-foreground/90 leading-relaxed whitespace-pre-wrap">
                            {description}
                          </p>
                        </div>

                        {/* Technologies in Dialog */}
                        {technologies.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2">
                              {locale === "en"
                                ? "Technologies used:"
                                : locale === "fa"
                                ? "تکنولوژی‌های استفاده شده:"
                                : "التقنيات المستخدمة:"}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {technologies.map((tech, index) => (
                                <Badge
                                  key={index}
                                  className="bg-popover border-border text-popover-foreground hover:bg-muted"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Button in Dialog */}
                        <div className="pt-4 border-t">
                          <Button
                            onClick={() => window.open(link, "_blank")}
                            className="cursor-pointer w-full bg-gradient-to-r from-primary to-primary/70 hover:from-primary/60 hover:to-primary/90 text-primary-foreground hover:text-primary-foreground"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            {locale === "en"
                              ? "View project"
                              : locale === "fa"
                              ? "مشاهده پروژه"
                              : "عرض المشروع"}
                            {locale === "en" ? (
                              <ChevronRight className="w-4 h-4 mr-2" />
                            ) : (
                              <ChevronLeft className="w-4 h-4 ml-2" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              <Button
                size="sm"
                onClick={() => window.open(link, "_blank")}
                className="cursor-pointer bg-gradient-to-r from-primary to-primary/90 hover:opacity-85 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                {locale === "en" ? "View" : locale === "fa" ? "مشاهده" : "منظر"}
              </Button>
            </div>
          </div>
        </CardContent>

        {/* Decorative Elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl group-hover:from-blue-400/20 group-hover:to-purple-400/20 transition-all duration-500"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-pink-400/10 to-yellow-400/10 rounded-full blur-3xl group-hover:from-pink-400/20 group-hover:to-yellow-400/20 transition-all duration-500"></div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
